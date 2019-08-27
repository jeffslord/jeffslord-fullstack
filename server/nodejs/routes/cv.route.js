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

router.post('/upload', upload.single('file'), (req, res, next) => {
  console.log('file', req.file);
  // console.log('body', req.body);
  console.log('Upload Path:', req.file.path);

  const data = fs.readFileSync(req.file.path, 'utf8');
  // console.log(data);
  cv.ProcessView(req.file.path, (err, cvRes) => {
    fs.unlink(req.file.path, (unlinkErr) => {
      console.log(cvRes);
      res.send(cvRes);
    });
  });

  // cv.ParseFile(req.file.path, (err, json) => {
  //   cv.GetSplitNodes(json, (err, splits) => {
  //     fs.unlink(req.file.path, (err) => {
  //       console.log(Object.keys(splits).length);
  //       res.send(splits);
  //     });
  //   });
  // });
  // fs.unlink(req.file.path, (err) => {
  //   res.send(req.body);
  // });
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
