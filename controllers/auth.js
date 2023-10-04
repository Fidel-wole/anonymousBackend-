const User = require('../model/user')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

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
    let loggedUser;
    User.findOne({username:username}).then(exist =>{
        if(!exist){
          return  res.status(401).json({error:"User does not exist"})
        }
        loggedUser = exist;
        bcrypt.compare(password, loggedUser.password).then(domatch =>{
            if(!domatch){
res.status(401).json({error:"Incorrect Password"})
            }
            const token = jwt.sign({
                username:loggedUser.username,
                userId:loggedUser._id.toString()
            },
            'somesupersecret',
            {
                expiresIn: '24h'
            }
            );
            res.status(200).json({token:token, userId: loggedUser._id.toString(), username: loggedUser.username});
        })
        })    
}