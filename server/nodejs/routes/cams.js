const express = require('express');

const router = express.Router();
const camController = require('../controllers/cam.controller');

// /* GET home page. */
// router.get("/test", function(req, res, next) {
//   res.send(cam_controller.test()    );
// });
router.get('/test', camController.test);
router.get('/', camController.getAll);
router.get('/:id', camController.get);

module.exports = router;
