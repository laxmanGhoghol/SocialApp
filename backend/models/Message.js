const Mongoose = require('mongoose');

const Message_Schema = new Mongoose.Schema({
    conversationId:{
        type:String,
        required: true
    },
    senderId:{
        type:String,
        required: true
    },
    text:{
        type:String,
        required: true
    }
},
{timestamps: true}
);

module.exports = Mongoose.model('Message', Message_Schema)