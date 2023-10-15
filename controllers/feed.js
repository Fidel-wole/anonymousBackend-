const anonymousTypes = require("../model/anonymousType");
const cache = require('memory-cache');
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
  const cacheKey = 'anonymousTypes';
  const cachedata  = cache.get(cacheKey);

  if(cachedata){
    res.status(200).json(cachedData);
  }else{
    anonymousTypes.find().then((anonymous) => {
      cache.get(cacheKey, {anonymous}, 60000)
      res.status(201).json({
      anonymous
      });
    }).catch(err =>{
      res.status(500).json({error:'An error ocurred'})
    });
  }

};
