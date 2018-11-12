'use strict';

import express from 'express';
import multer from 'multer';

import s3 from '../middleware/s3';

const uploadRouter = express.Router();

const uploader = multer({ dest: `${__dirname}/../../tmp` });

uploadRouter.post('/upload', uploader.any(), (req, res) => {
  console.log('request.files', req.files);

  if (req.files.length > 1) {
    return 'Too many files';
  }

  let file = req.files[0];
  let key = `${file.filename}:${file.originalname}`;

  s3.uploadFile(file.path, key)
    .then(url => {
      let output = { url: url };
      res.send(output);
    })
    .catch(console.error);

});

export default uploadRouter;