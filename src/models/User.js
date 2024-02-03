const mongoose = require('mongoose');
const userSchema = mongoose.Schema(
    {
        name:{
            type:String,
            required:true
        },
        password: {
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true,
            unique:true
        },
        imageUrl: {
            type:String,
            required:true
        },
        address: {
            type:String,
            required:false
        },
        profileSummary: {
            type:String,
            required:true
        },
        gender: {
            type:String,
            required:true,
            enum: ['Male','Female','Others'],
        }
    },{timestamps:true},
    {minimize:false}
);
module.exports = mongoose.model('User',userSchema);