const mongoose = require('mongoose');
// const Cam = require('../models/cam.model');

module.exports = {
  test: (req, res) => {
    res.send('Test successful.');
    console.log('test successful');
  },
  // get: (req, res) => {},
  getAll: (req, res) => {
    mongoose.model('Cam').find({}, (err, camRes) => {
      if (err) {
        // res.send(err);
        return console.log(err);
      }
      res.send(camRes);
    });
  },
  // delete: (req, res) => {},
  create: (req, res) => {
    mongoose.model('Cam').create(
      {
        url: req.body.url,
        description: req.body.description,
        user: req.body.user,
        pass: req.body.pass,
      },
      (err, camRes) => {
        if (err) {
          res.send(camRes);
        }
      },
    );
  },
  // update: (req, res) => {},
};
