const User = require('../model/user')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

exports.registerUser = (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  // Check if the username already exists
  User.findOne({ username: username })
    .then((user) => {
      if (user) {
        // User with the given username already exists
        return res.status(401).json({ message: "Username already exists, please choose another one" });
      } else {
        // Username is available, hash the password
        return bcrypt.hash(password, 12);
      }
    })
    .then((hashPassword) => {
      // Create a new user with the hashed password
      const user = new User({
        username: username,
        password: hashPassword,
      });

      // Save the user to the database
      return user.save();
    })
    .then(() => {
      // User successfully created
      res.status(201).json({
        message: "User Successfully Created",
        details: {
          username: username,
        },
      });
    })
    .catch((error) => {
      // Handle any errors that may occur during the registration process
      console.error("Error registering user: ", error);
      res.status(500).json({ message: "Internal server error" });
    });
};

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