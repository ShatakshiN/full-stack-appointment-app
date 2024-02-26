const express = require('express');
const router = express.Router();
const userController = require('../controllers/appointmentusers');


router.use(userController.err);

module.exports = router;
