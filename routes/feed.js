const feedController = require('../controllers/feed');
const messageController = require('../controllers/user')
const isAuth = require('../middlewares/auth')
const express = require('express');
const router = express.Router()

router.get('/authUser', isAuth, (req, res) => {
    // Access the userId from req.userId (provided by the isAuth middleware)
    const userId = req.userId;
  
    // Include userId in the response
    res.json({ userId });
  });

router.get('/anonymous', isAuth, feedController.getAnonymousTypes);

router.post('/anonymous', isAuth, feedController.postAnonymousTypes);

router.get('/messages', isAuth, messageController.getUserMessages);

router.get('/message/:messageId', messageController.getUserMessage);

router.post('/message/:anonymousId/:userId', messageController.postMessages);

module.exports = router;