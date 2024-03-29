if(process.env.NODE_ENV !== "productiono"){
  require('dotenv').config();
}
const cors = require('cors');
const path = require('path');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const session = require("express-session");
const authRoute = require('./routes/auth');
const isAuth = require('./middlewares/auth')
const mongoDbStore = require("connect-mongodb-session")(session);   
const MONGODB_URI =
  `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@cluster0.cwzz5uc.mongodb.net/${process.env.MONGODB_DATABASE}`;
const bodyparser = require('body-parser')
const feedRoute = require('./routes/feed')
const cron = require('node-cron');
const Message = require('./model/messages');
// // const helmet = require('helmet'); 

const store = new mongoDbStore({
  uri: MONGODB_URI,
  collection: "sessions",
});

mongoose.set('strictQuery', false);

app.use(cors());
app.use(bodyparser.json());
app.use(express.static(path.join(__dirname, 'uploads')))
app.use(
  session({ secret: "my secret", resave: false, saveUninitialized: false, store:store })
);
app.use((req, res, next)=>{
res.setHeader('Access-Control-Allow-Origin', '*');
res.setHeader('Access-Control-Allow-Methods', 'OPTIONS', 'PUT', 'POST', 'PATCH', 'GET', 'DELETE');
res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
next();
})
//in charge of logged users details
app.get('/authUser', isAuth, (req, res) => {
  // Access the userId from req.userId (provided by the isAuth middleware)
  const userId = req.userId;
  const username = req.username;
  // Include userId in the response
  res.json({ userId, username });
});

app.use(feedRoute);
app.use(authRoute);

cron.schedule('0 0 * * *', ()=>{
const cutOffDate = new Date();
cutOffDate.setHours(cutOffDate.getHours - 48);

Message.deleteMany({createdAt: {$lt: cutOffDate}})
.then(()=>{
  res.json({message:" Sucessfully cleared messages older than 48 hours"})
}).catch((err)=>{
  res.json({err})
})
})
mongoose.connect(MONGODB_URI)
.then(()=>{
    app.listen(process.env.PORT || 8000);
})