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
// router.get()
router.get('/analyze', (req, res, next) => {
  const filePath = path.join(`${__dirname}`, '..', 'data', 'xml', 'employeespunchedin.xml');
  const analyze = {};
  cv.ParseFile(filePath, (err, json) => {
    cv.GetSplitNodes(json, (err, splits) => {
      analyze.splitNodes = splits;
      cv.GetRightJoinCvs(json, (err, rightJoins) => {
        analyze.rightJoins = rightJoins;
        res.send(analyze);
      });
    });
  });
});

router.post('/upload', upload.single('files'), (req, res, next) => {
  console.log('file', req.file);

  console.log('body', req.body);

  fs.unlink(req.file, (err) => {
    res.send(req.body);
  });
});
router.post('/uploadMany', upload.array('files'), (req, res, next) => {
  console.log('files', req.files);

  console.log('body', req.body);
  res.send('done');
});

module.exports = router;
