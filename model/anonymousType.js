const mongoose = require('mongoose');
const Schema  = mongoose.Schema;

const anonymousSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    link:{
        type:String
    },
    themecolor:{
        type:String,
        required:true
    }
});

module.exports = mongoose.model('AnonymousType', anonymousSchema);