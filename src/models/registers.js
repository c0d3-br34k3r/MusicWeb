const mongoose = require("mongoose");

const recordsSchema = new mongoose.Schema({
    email :{
        type: String,
        unique:true,
        sparse:true
    },
    username :{
        type: String,
        required:true
    },
    password :{
        type: String,
        required:true
    },
    cpassword :{
        type: String,
        required:true
    },

})

const Register = new mongoose.model("Register", recordsSchema)

module.exports = Register;