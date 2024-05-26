const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const modalityController = require('../controllers/modalityController');

router.get('/', auth, modalityController.getAllModalities);
router.get('/:id', auth, modalityController.getModalityById);

module.exports = router;

