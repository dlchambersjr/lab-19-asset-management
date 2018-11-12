import supergoose, { startDB, stopDB } from './supergoose.js';

import { app } from '../src/server.js';


const mockRequest = supergoose(app);

beforeAll(startDB);
afterAll(stopDB);

beforeEach(async () => {
  //pre-load info
});

afterEach(async () => {
  //clear test data
});

describe('Test server', () => {

  it('should verify the server is running', () => {

    // FIXME: How can I test the index.js and server.js

  });

});