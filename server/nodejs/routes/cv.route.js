const express = require('express');
const path = require('path');
const multer = require('multer');
const fs = require('fs');
const cv = require('../modules/cv_check_fix');

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
  cv.CheckView(req.file.path, (err, cvRes) => {
    if (err) {
      fs.unlinkSync(req.file.path);
    }
    fs.unlink(req.file.path, (unlinkErr) => {
      console.log(cvRes);
      analyzeRes.push(cvRes);
      res.send(analyzeRes);
    });
  });
});
router.post('/fixSingle', upload.single('file'), (req, res, next) => {
  // console.log('req.file', req.file);
  // console.log('Upload Path:', req.file.path);
  cv.FixView(req.file.path, (err, xmlRes) => {
    if (err) {
      fs.unlinkSync(req.file.path);
    }
    fs.unlink(req.file.path, (unlinkErr) => {
      // console.log('Unlink:', req.file.path);
      const data = { xml: xmlRes };
      res.send(data);
    });
  });
});

router.post('/analyzeMany', upload.array('files'), (req, res, next) => {
  // console.log(req);
  // console.log('file', req.file);
  // console.log('files', req.files);
  // console.log('body', req.body);
  const analyzeRes = [];
  let fileCount = 0;
  req.files.forEach((file) => {
    // console.log('Upload Path:', file.path);
    cv.CheckView(file.path, (err, cvRes) => {
      if (err) {
        fs.unlinkSync(file.path);
      }
      fs.unlink(file.path, (err) => {
        // console.log('Unlink:', file.path);
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

router.post('/fixMany', upload.array('files'), (req, res, next) => {
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

// router.get('/downloadFixedView', (req, res, next) => {
//   fs.writeFile('../data/download/', req.body.xml, (err) => {
//     fs.unlink('')
//   });
// });

module.exports = router;
