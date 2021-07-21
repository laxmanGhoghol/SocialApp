const router = require('express').Router();
const bcrypt = require('bcrypt')
const User = require('../models/User');
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

//update user
router.put("/:id", authenticateToken, async (req, res) => {
    if (req.user.userId === req.params.id || req.body.isAdmin) {
        if (req.body.password) {
            try {
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt)
            } catch (err) {
                return res.status(500).json({ 'ok': false });
            }
        }
        try {
            await User.findByIdAndUpdate(req.params.id, { $set: req.body });
            res.status(200).json({ 'ok': true });
        } catch (err) {
            return res.status(500).json({ 'ok': false })
        }
    }
    else {
        res.status(403).json({ 'ok': false })
    }
})
//delete user
router.delete("/:id", authenticateToken, async (req, res) => {
    if (req.user.userId === req.params.id || req.body.isAdmin) {
        try {
            await User.deleteOne({ _id: req.params.id });
            res.status(200).json({ 'ok': true });
        } catch (err) {
            res.status(500).json({ 'ok': false });
        }
    }
    else {
        res.status(403).json({ 'ok': false })
    }
})
//get user
router.get("/:id", authenticateToken, async (req, res) => {
    try {
        const user = await User.findById(req.params.id).lean();
        const { password, updatedAt, __v, isAdmin, ...rest } = user // destructuring object to select only important fields
        res.status(200).json({ 'ok': true, 'data': rest });
    } catch (err) {
        res.status(500).json({ 'ok': false });
    }
})

router.get("/get", authenticateToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).lean();
        const { password, updatedAt, __v, isAdmin, ...rest } = user // destructuring object to select only important fields
        res.status(200).json({ 'ok': true, 'data': rest });
    } catch (err) {
        res.status(500).json({ 'ok': false });
    }
})

//follow user
router.put("/:id/follow", authenticateToken, async (req, res) => {
    if (req.user.userId !== req.params.id) {
        try {
            const user = await User.findById(req.params.id);   //user to follow
            const currUser = await User.findById(req.user.userId); //current user

            if (!user.followers.includes(req.user.userId)) { // check if already following the user
                await user.updateOne({ $push: { followers: req.user.userId } });
                await currUser.updateOne({ $push: { followings: req.params.id } });

                res.status(200).json({ 'ok': true });
            }
            else {
                res.status(403).json({ 'ok': false, 'err': 'already following' })
            }
        } catch (err) {
            res.status(403).json({ 'ok': false });
        }
    } else {
        res.status(500).json({ 'ok': false, 'err': "can't follow yourself" })
    }
})
//unfollow user
router.put("/:id/unfollow", authenticateToken, async (req, res) => {
    if (req.user.userId !== req.params.id) {
        try {
            const user = await User.findById(req.params.id);
            const currUser = await User.findById(req.user.userId);

            if (user.followers.includes(req.user.userId)) { //check if not following user already.
                await user.updateOne({ $pull: { followers: req.user.userId } });
                await currUser.updateOne({ $pull: { followings: req.params.id } });

                res.status(200).json({ 'ok': true });
            }
            else {
                res.status(403).json({ 'ok': false, 'data': 'not following' })
            }
        } catch (err) {
            res.status(403).json({ 'ok': false });
        }
    } else {
        res.status(500).json({ 'ok': false })
    }
})

module.exports = router