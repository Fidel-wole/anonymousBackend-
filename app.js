const express = require('express');
const app = express();
const mongoose = require('mongoose');
const session = require("express-session");
const authRoute = require('./routes/auth');
const isAuth = require('./middlewares/auth')
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
app.get('/authUser', isAuth, (req, res) => {
  // Access the userId from req.userId (provided by the isAuth middleware)
  const userId = req.userId;
  // Include userId in the response
  res.json({ userId });
});
app.use(feedRoute);
app.use(authRoute);
mongoose.connect(MONGODB_URI).then(()=>{
    app.listen(8000);
})
