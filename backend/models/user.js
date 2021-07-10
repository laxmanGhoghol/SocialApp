const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    username:{
        type: String,
        require: true,
        min: 4,
        max: 30,
        unique: true
    },
    email:{
        type: String,
        require: true,
        min: 6,
        max: 30,
        unique: true
    },
    password:{
        type: String,
        require: true,
        min: 6
    },
    profilePic:{
        type: String,
        default: ""
    },
    CoverPic:{
        type: String,
        default: ""
    },
    followers:{
        type: Array,
        default: []
    },
    following:{
        type: Array,
        default: []
    },
    isAdmin:{
        type: Boolean,
        default: false
    },
},
{timestamps: true}
);

module.exports = mongoose.model("User", UserSchema)