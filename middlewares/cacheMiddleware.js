const redis = require('redis');
const redisClient = redis.createClient();

function cacheMiddleware(req, res, next){
    const key = req.url;

    redisClient.get(key, (err, cachedData)=>{
        if(err){
            console.error('Redis error', err)
            return next();
        }

        if(cachedData){
            res.send(JSON.parse(cachedData));
        }
        else{
            next();
        }
    })
}

module.exports = cacheMiddleware;