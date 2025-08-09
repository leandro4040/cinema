const express = require('express');
const router = express.Router();
const listsController = require('../controllers/listsController');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware);

router.post('/', listsController.createList);
router.get('/', listsController.getUserLists);
router.delete('/:id', listsController.deleteList);

module.exports = router;