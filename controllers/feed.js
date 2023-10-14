const anonymousTypes = require("../model/anonymousType");
const redisClient = require('../redisConfig');
exports.postAnonymousTypes = (req, res, next) => {
  const title = req.body.title;
  const description = req.body.description;
  const link = req.body.link;
  const themecolor = req.body.themecolor;
  const anonymous = new anonymousTypes({
    title: title,
    description: description,
    link: link,
    themecolor:themecolor
  });
  anonymous.save().then((data) => {
    res.status(201).json({
      message: "Anonymous Saved",
    });
  });
};

exports.getAnonymousTypes = (req, res, next) => {
  anonymousTypes.find().then((anonymous) => {

    redisClient.setex(req.url, 86400, JSON.stringify(anonymous));
    res.status(201).json({
    anonymous
    });
  });
};
