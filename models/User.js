const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email:{
        type:String,
        unique:true,
        required:true,
        trim:true,
        tolowercase:true,
        maxlength:45,
    },
    firstname:{
        type:String,
        required:true,
        tolowercase:true,
        maxlength:30,
    },
    lastname:{
        type:String,
        required:true,
        tolowercase:true,
        maxlength:30,
    },
    password:{
        type:String,
        required:true,
    },
    created_at:{
        type:Date,
        default:Date.now(),
    },
    followers:[String],
    following:[String]
});

module.exports = mongoose.model('users', UserSchema);