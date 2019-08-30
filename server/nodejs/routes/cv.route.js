const express = require('express');
const path = require('path');
// const formidable = require('formidable');
const multer = require('multer');
const fs = require('fs');
const cv = require('../modules/cv_parse');

const upload = multer({ dest: 'uploads/' });

const router = express.Router();

router.get('/', (req, res, next) => {
  console.log('hey there');
  cv.Test();
  res.send('Test successful');
});

router.post('/analyzeSingle', upload.single('file'), (req, res, next) => {
  console.log('file', req.file);
  // console.log('body', req.body);
  console.log('Upload Path:', req.file.path);
  cv.ProcessView(req.file.path, (err, cvRes) => {
    fs.unlink(req.file.path, (unlinkErr) => {
      console.log(cvRes);
      res.send(cvRes);
    });
  });
});
router.post('/fixSingle', upload.single('file'), (req, res, next) => {
  console.log('file', req.file);
  console.log('Upload Path:', req.file.path);
  cv.FixView(req.file.path, (err, xmlRes) => {
    fs.unlink(req.file.path, (unlinkErr) => {
      const data = { xml: xmlRes };
      res.send(data);
    });
  });
});

router.post('/uploadMany', upload.array('files'), (req, res, next) => {
  console.log('files', req.files);
  console.log('body', req.body);

  req.files.forEach((file) => {
    console.log('Upload Path:', file.path);
    fs.unlink(file.path, (err) => {
      console.log('Unlink:', file.path);
    });
  });
  res.send(req.body);
});

module.exports = router;
