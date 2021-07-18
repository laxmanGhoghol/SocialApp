const Mongoose = require('mongoose');

const Conversation_Schema = new Mongoose.Schema({
    members: {
        type: Array
    }
},
    { timestamps: true }
);

module.exports = Mongoose.model('Conversation', Conversation_Schema)