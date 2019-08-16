const express = require('express');
const path = require('path');
const cv = require('../modules/cv_parse');

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

module.exports = router;
