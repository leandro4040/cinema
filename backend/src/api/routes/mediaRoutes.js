const express = require('express');
const router = express.Router();
const mediaController = require('../controllers/mediaController');

router.get('/', mediaController.getAllMedia);

module.exports = router;