const User = require("../model/user");
const AnonymousType = require('../model/anonymousType');
const Message = require("../model/messages")

exports.getUserMessages = (req, res, next) => {
  const userId = req.userId;

  Message.find({ userId: userId })
    .populate('anonymousId') // Populate the anonymousId field
    .then(messages => {
      if (!messages || messages.length === 0) {
        return res.status(404).json({ error: "No messages found for the user" });
      }
      res.json({ messages });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: "Error fetching messages" });
    });
};


exports.getUserMessage = (req, res, next) => {
  const messageId = req.params.messageId;

  Message.findById(messageId)
  .populate('anonymousId')
    .then(message => {
      if (!message) {
        return res.status(404).json({ message: 'Message not found' });
      }
      res.json({ message });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: 'Error fetching message' });
    });
};

exports.getMessageDetails = (req, res)=>{
  const userId = req.params.userId;
  const anonymousId = req.params.anonymousId;
  User.findById(userId).then(user =>{
    if(!user){
      res.status(404).json({error:"User does not exist"})
    }
    AnonymousType.findById(anonymousId).then((data)=>{
      if(!data){
        res.status(404).json({message:'Not Found'})
      }
      res.json({data:data})
        }).catch(err =>{
          console.log(err)
        })
  })
  
}

exports.postMessages = (req, res, next) => {
  const userId = req.params.userId;
  const anonymousId = req.params.anonymousId;
  const message = req.body.message;
  if(!userId){
    res.json({err:"invalid User"})
  }
const messages = new Message({
  userId:userId,
  anonymousId:anonymousId,
  message:message
})
messages.save().then(()=>{
  res.json({message:"Saved"})
})
};

exports.deleteAllMessage = (req, res)=>{
  const userId = req.userId;
  Message.deleteMany({userId:userId})
  .then((deleted)=>{
    res.json({deleted})
  }).catch((error)=>{
console.log(error)
  })
}

exports.deleteSingleMessage = (req, res)=>{
  const messageId = req.params.messageId;
  Message.findByIdAndRemove(messageId)
  .then((message)=>{
    if(!message){
      res.json({error:"Unable to delete message"})  
    }
    res.json({message:"Message deleted sucessfully"})
  })
}