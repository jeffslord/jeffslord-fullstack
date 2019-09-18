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
  console.log('Upload Path:', req.file.path);
  const analyzeRes = [];
  cv.ProcessView(req.file.path, (err, cvRes) => {
    fs.unlink(req.file.path, (unlinkErr) => {
      console.log(cvRes);
      analyzeRes.push(cvRes);
      res.send(analyzeRes);
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

router.post('/analyzeMany', upload.array('files'), (req, res, next) => {
  // console.log(req);
  console.log('file', req.file);
  console.log('files', req.files);
  console.log('body', req.body);
  const analyzeRes = [];
  let fileCount = 0;
  req.files.forEach((file) => {
    console.log('Upload Path:', file.path);
    cv.ProcessView(file.path, (err, cvRes) => {
      fs.unlink(file.path, (err) => {
        console.log('Unlink:', file.path);
        analyzeRes.push(cvRes);
        fileCount += 1;
        if (fileCount === req.files.length) {
          res.send(analyzeRes);
        }
      });
    });
  });
  // res.send(analyzeRes);
  // res.send(req.body);
});

module.exports = router;
