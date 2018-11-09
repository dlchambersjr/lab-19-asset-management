'use strict';

import express from 'express';
import multer from 'multer'

const uploadRouter = express.Router();

const uploader = multer({ dest: `$__direname}/../../tmp` });

uploadRouter.post('/upload', uploader.any(), (req, res) => {


});