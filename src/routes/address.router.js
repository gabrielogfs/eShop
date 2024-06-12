const express = require('express');
const router = express.Router();
const addressController = require('../controllers/addressController');

router.get('/', addressController.renderAddr);
router.post('/', addressController.createAddress);

module.exports = router;