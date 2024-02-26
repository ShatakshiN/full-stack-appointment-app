const express = require('express');
const router = express.Router();
const userController = require('../controllers/appointmentusers');

router.get('/add-user', userController.getUsers);

module.exports = router;
