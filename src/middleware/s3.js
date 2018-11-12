'use strict';

require('dotenv').config();
console.log(process.env.AWS_BUCKET);

import fs from 'fs-extra';
import aws from 'aws-sdk';

const s3 = new aws.S3();

const uploadFile = (filepath, key) => {
  let config = {
    Bucket: process.env.AWS_BUCKET,
    // Bucket: 'http://lab-19-asset-management.s3-website-us-west-2.amazonaws.com',
    Key: key,
    ACL: 'public-read',
    Body: fs.createReadStream(filepath),
  };

  console.log(config.bucket);

  return s3.upload(config)
    .promise()
    .then(result => {
      fs.remove(filepath)
        .then(() => result.Location);
    })
    .catch(err => {
      console.error(err);
      return fs.remove(filepath)
        .then(() => Promise.reject(err));
    });
};

export default { uploadFile };