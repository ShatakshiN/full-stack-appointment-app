const express = require('express');

const router = express.Router();
const userController = require('../controllers/appointmentusers');


router.delete('/delete-user/:userId',userController.delUser);

module.exports = router;
