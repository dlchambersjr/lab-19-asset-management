'use strict';

require('dotenv').config();

import supergoose, { startDB, stopDB } from './supergoose.js';
import { app } from '../src/server.js';

const mockRequest = supergoose(app);

beforeAll(startDB);
afterAll(stopDB);

describe('/upload route', () => {
  it('should upload a file', async () => {
    try {
      const uploadedPath = await mockRequest.post('/upload')
        .attach('img', `${__dirname}/assets/passport.jpg`)
        .then(res => {
          expect(res.status).toEqual(200);
        });

      console.log(uploadedPath);

      return uploadedPath;

    } catch (error) { console.error(error); }
  });
});