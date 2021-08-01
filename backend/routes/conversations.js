const router = require('express').Router();
const Conversation = require("../models/Conversation");
const Message = require("../models/Message")
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

//post Conversation
router.post("/create", authenticateToken, async (req, res) => {
    try {
        const conversation = await Conversation.findOne({ members: { $all: [req.user.userId, req.body.receiverId] } })
        if (conversation) {
            return res.status(200).json({ 'ok': true, 'data': conversation._id }) // return the conversation id if already exists
        }

        const newconversation = new Conversation({
            members: [req.user.userId, req.body.receiverId]
        });
        const val = await newconversation.save();
        res.status(200).json({ 'ok': true, 'data': val._id })
    } catch (err) {
        res.status(500).json({ 'ok': false });
    }
});

//get conversation with messages
router.get('/:id', authenticateToken, async (req, res) => {
    try {
        const conversation = await Conversation.findById(req.params.id)
        if (!conversation.members.includes(req.user.userId)) {
            res.status(400).json({ 'ok': false, 'err': 'only member of conversation can see it' })
        }
        const getconversation = await Message.find({ conversationId: conversation._id })
        res.status(200).json({ 'ok': true, 'data': getconversation });
    } catch (err) {
        res.status(500).json({ 'ok': false })
    }
})

//get user's conversations list
router.get('/', authenticateToken, async (req, res) => {
    try {
        const conversations = await Conversation.find({ members: { $in: [req.user.userId] } });
        res.status(200).json({ 'ok': true, 'data': conversations });
    } catch (err) {
        console.log('err')
        res.status(500).json({ 'ok': false })
    }
});

//get conversation including two users
router.get("/find/:firstUserId/:secondUserId", authenticateToken, async (req, res) => {
    try {
        const conversation = await Conversation.findOne({ members: { $all: [req.params.firstUserId, req.params.secondUserId] } });
        res.status(200).json({ 'ok': false, 'data': conversation });
    } catch (err) {
        console.log(err)
        res.status(500).json({ 'ok': false })
    }
})

//delete conversation
router.delete('/delete/:id', authenticateToken, async (req, res) => {
    try {
        const conversation = await Conversation.findById(req.params.id);
        !conversation && res.status(400).json({ 'ok': false, 'err': 'conversation not found' })
        !conversation.members.includes(req.user.userId) && res.status(400).json({ 'ok': false, 'err': 'only member of conversation can delete it' })
        const membersSize = conversation.toObject().members.length
        if (membersSize <= 1) {
            await Message.deleteMany({ conversationId: conversation._id })
            await conversation.deleteOne();
        }
        else {
            await conversation.updateOne({ $pull: { members: req.user.userId } });
        }
        res.status(200).json({ 'ok': true })
    } catch (err) {
        res.status(500).json({ 'ok': false })
    }
});

module.exports = router