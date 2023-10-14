const feedController = require('../controllers/feed');
const messageController = require('../controllers/user')
const isAuth = require('../middlewares/auth')
const express = require('express');
const cacheMiddleware = require('../middlewares/cacheMiddleware');
const router = express.Router()

router.get('/authUser', isAuth, (req, res) => {
    // Access the userId from req.userId (provided by the isAuth middleware)
    const userId = req.userId;
  
    // Include userId in the response
    res.json({ userId });
  });

router.get('/anonymous', isAuth, cacheMiddleware, feedController.getAnonymousTypes);

router.post('/anonymous', isAuth, feedController.postAnonymousTypes);

router.get('/messages', isAuth, cacheMiddleware, messageController.getUserMessages);

router.get('/message/:messageId', cacheMiddleware, messageController.getUserMessage);

router.get('/message/:anonymousId/:userId', cacheMiddleware, messageController.getMessageDetails);

router.post('/message/:anonymousId/:userId', messageController.postMessages);

router.post('/deletemessages', isAuth, messageController.deleteAllMessage);

router.post('/deletemessage/:messageId', isAuth, messageController.deleteSingleMessage)
module.exports = router;