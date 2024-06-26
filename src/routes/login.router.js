const express = require('express');
const router = express.Router();
const sessionController = require('../controllers/sessionController');
const userController = require('../controllers/userController');

router.get('/', sessionController.login);
router.post('/', sessionController.loginUser);
router.get('/', sessionController.perfil);
router.post('/', userController.createUser);

module.exports = router;