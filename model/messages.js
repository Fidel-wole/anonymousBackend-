const mongoose = require('mongoose');

const Schema = mongoose.Schema

const messagesSchema = new Schema({
    userId:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    anonymousId:{
        type:Schema.Types.ObjectId,
        ref:"AnonymousType"
    },
    message:{
        type:String,
        required: true,

       
    },
    
},  {timestamps: true})

module.exports = mongoose.model('Message', messagesSchema);