const User = require("../model/user");

exports.getUserMessage = (req, res, next) => {
  const userId = req.user._id;
  User.findById(userId)
    .populate("messages.info.anonymousId")
    .then((user) => {
      if (!user) {
        res.status(404).json({ error: "User does not exist" });
      }
      const messagesArray = user.messages.info;
      res.status(201).json({
        messagesArray,
      });
    });
};

exports.postMessages = (req, res, next) => {
  const userId = req.params.userId;
  const anonymousId = req.params.anonymousId;
  const message = req.body.message;

  User.findById(userId)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ error: "Invalid User" });
      }

      user.messages.info.push({
        anonymousId: anonymousId,
        receivedMessage: message,
      });

      return user.save();
    })
    .then(() => {
      res.json({ message: "Message sent" });
    })
    .catch((err) => {
      console.error("Error:", err);
      res.status(500).json({ error: "Internal Server Error" });
    });
};
