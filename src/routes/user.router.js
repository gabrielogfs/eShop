const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { checkAuthenticated } = require('../middleware/auth');

router.get('/', checkAuthenticated, userController.getUser);
router.get('/:id', checkAuthenticated, userController.getUserbyId);
router.post('/', userController.createUser);
router.put('/:id', checkAuthenticated, userController.updateUser);
router.delete('/:id', checkAuthenticated, userController.deleteUser);


module.exports = router;