const express = require('express');
const router = express.Router();
const userController = require('../controllers/appointmentusers');

router.post('/add-user',userController.postUsers);

module.exports = router;

