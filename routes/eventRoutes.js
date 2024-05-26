const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const eventController = require('../controllers/eventController');

router.post('/', auth, eventController.createEvent);
router.get('/:id', auth, eventController.getEventById);
router.get('/', auth, eventController.getEvents);

module.exports = router;

