const express = require('express');
const router = express.Router();
const registerController = require('../controllers/registerController');
const userController = require('../controllers/userController');

router.get('/', registerController.renderReg);
router.post('/', userController.createUser);

module.exports = router;