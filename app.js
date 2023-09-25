const express = require('express');
const app = express();
const mongoose = require('mongoose');
const session = require("express-session");
const authRoute = require('./routes/auth');
const mongoDbStore = require("connect-mongodb-session")(session);   
const MONGODB_URI =
  "mongodb+srv://Fidel_Wole:2ql24UoUi4uN5302@cluster0.cwzz5uc.mongodb.net/anonymous";
const bodyparser = require('body-parser')
const feedRoute = require('./routes/feed')
const User = require('./model/user');

const store = new mongoDbStore({
  uri: MONGODB_URI,
  collection: "sessions",
});

app.use(bodyparser.json());

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
app.use((req,res, next)=>{
  if(!req.session.user){
     return  next();
  }
User.findById(req.session.user._id)
.then(user =>{
  req.user = user;
  next();
}).catch(err =>{
  console.log(err);
})
})
app.use(feedRoute);
app.use(authRoute);
mongoose.connect(MONGODB_URI).then(()=>{
    app.listen(8000);
})
