const bcrypt = require("bcrypt")
const router = require('express').Router();
const Message = require("../models/Message");
const jwt = require('jsonwebtoken');

//authenticate jwt token
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user
        next()
    });

}
//post message
router.post('/', authenticateToken, async (req, res)=>{
    try {
        const new_msg = new Message({
            text: req.body.text,
            senderId: req.user.userId,
            conversationId: req.body.conversationId
        });
        const msg = await new_msg.save();
        res.status(200).json({'ok':true, 'data': {'text': msg.text, 'senderId': msg.senderId}})
    } catch (err) {
        res.status(500).json({'ok': false})
    }
})

module.exports = router