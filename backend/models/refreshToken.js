const mongoose = require("mongoose")

const refreshTokenSchema = new mongoose.Schema({
    token:{
        type: String,
        require: true
    },
},
{timestamps: true}
);

module.exports = mongoose.model("refreshToken", refreshTokenSchema)