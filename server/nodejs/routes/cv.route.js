const express = require('express');
const path = require('path');
const multer = require('multer');
const fs = require('fs');
const cv = require('../services/cv');

const upload = multer({ dest: 'uploads/' });
const router = express.Router();

router.get('/', (req, res, next) => {
  console.log('hey there');
  cv.Test();
  res.send('Test successful');
});

router.post('/analyzeSingleFile', upload.single('file'), (req, res, next) => {
  cv.AnalyzeSingleFile(req.file.path, (err, analyzeRes) => {
    if (err) {
      throw err;
    } else {
      res.send(analyzeRes);
    }
  })
});

router.post('/analyzeManyFiles', upload.array('files'), (req, res, next) => {
  cv.AnalyzeManyFiles(req.files, (err, analyzeRes) => {
    if (err) {
      throw err;
    } else {
      res.send(analyzeRes);
    }
  })
});

router.post('/fixSingleFile', upload.single('file'), (req, res, next) => {
  cv.FixSingleFile(req.file.path, (err, xmlRes) => {
    if (err) {
      throw err
    } else {
      const data = { xml: xmlRes };
      res.send(data);
    }
  });
});

router.post('/fixManyFiles', upload.array('files'), (req, res, next) => {
  let fileCount = 0;
  const allRes = [];
  req.files.forEach((file) => {
    cv.FixView(file.path, (err, xmlRes) => {
      if (err) {
        fs.unlinkSync(file.path);
      }
      fs.unlink(file.path, (unlinkErr) => {
        // allRes.push({
        //   file['originalname']:xmlRes
        // });
        fileCount += 1;
        if (fileCount === req.files.length) {
          res.send(allRes);
        }
      });
    });
  });
});

router.post('/analyzeManyCdata', (req, res, next) => {
  const { cdata } = req.body;
  const current = cdata.replace(/[\t\n\r]/gm, '');
  res.send(current);
});

router.post('/analyzeCdata', (req, res, next) => { });

module.exports = router;
