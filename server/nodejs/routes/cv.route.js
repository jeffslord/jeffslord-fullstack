const express = require('express');
const cv = require('../modules/cv_parse');

const router = express.Router();

router.get('/', (req, res, next) => {
  console.log('hey there');
  cv.Test();
  res.send('Test successful');
});

module.exports = router;
