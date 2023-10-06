
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const anonymousSchema = new Schema({
    username:{
        type:String,
        required: true,
    },
    password:{
        type:String,
        required:true
    },
    avatar:{
        type:String,
    }
  
});
module.exports = mongoose.model('User', anonymousSchema);
