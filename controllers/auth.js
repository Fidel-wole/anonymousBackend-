const User = require('../model/user')
const bcrypt = require('bcryptjs');


exports.registerUser = (req, res, next)=>{
const username = req.body.username;
const password = req.body.password;
User.findOne({username:username}).then(user =>{
    if(user){
       res.status(401).json({message:"Username already exist, please choose another one"}) 
    }
    return bcrypt.hash(password, 12);
}).then((hashpassword)=>{
    const user = new User({
        username:username,
        password:hashpassword,
        messages:{info:[]}
    })
    user.save().then(()=>{
        res.status(201).json({
            message: "User Sucessfully Created",
            details:{
                username:username,
                password:hashpassword
            }
        })
    })
})
}

exports.login = (req, res, next)=>{
    const username = req.body.username;
    const password = req.body.password;

    User.findOne({username:username}).then(exist =>{
        if(!exist){
          return  res.status(401).json({error:"User does not exist"})
        }
        bcrypt.compare(password, exist.password).then(domatch =>{
            if(!domatch){
res.status(401).json({error:"Incorrect Password"})
            }
            req.session.isAuthenticated = true;
            req.session.isLoggedIn = true;
            req.session.user = exist;
            return req.session.save((err) => {
              if (err) {
                console.log(err);
              }
            res.status(201).json({message:"Logged in sucessfully"})
        })
        })
    })
}