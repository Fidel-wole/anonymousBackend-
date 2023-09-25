const feedController = require('../controllers/feed');
const messageController = require('../controllers/user')

const express = require('express');
const router = express.Router()

router.get('/anonymous', feedController.getAnonymousTypes);

router.post('/anonymous', feedController.postAnonymousTypes);

router.get('/messages', messageController.getUserMessage);

router.post('/message/:anonymousId/:userId', messageController.postMessages);

module.exports = router;