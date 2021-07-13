const router = require('express').Router();
const bcrypt = require('bcrypt')
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { route } = require('./auth');

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
    if (req.body.userId === req.params.id || req.body.isAdmin) {
        if (req.body.password) {
            try {
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt)
            } catch (err) {
                return res.status(500).json(err);
            }
        }
        try {
            const user = await User.findByIdAndUpdate(req.params.id, { $set: req.body });
            res.status(200).json('account has been updated');
        } catch (err) {
            return res.status(500).json('invalid data')
        }
    }
    else {
        res.status(403).json('you can update only your account')
    }
})
//delete user
router.delete("/:id", authenticateToken, async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
        try {
            await User.deleteOne({ _id: req.params.id });
            res.status(200).json('account has been deleted');
        } catch (err) {
            res.status(500).json(err);
        }
    }
    else {
        res.status(403).json('you can delete only your account')
    }
})
//get user
router.get("/:id", authenticateToken, async (req, res) => {
    if (req.body.userId === req.params.id) {
        try {
            const user = await User.findById(req.params.id).lean();
            const { password, updatedAt, __v, isAdmin, ...rest } = user // destructuring object to select only important fields
            res.status(200).json(rest);
        } catch (err) {
            res.status(500).json('invalid user id');
        }
    }
    else {
        res.status(404).json("you have to login first")
    }
})

//follow user
router.put("/:id/follow", authenticateToken, async (req, res) => {
    if (req.body.userId !== req.params.id) {
        try {
            const user = await User.findById(req.params.id);   //user to follow
            const currUser = await User.findById(req.body.userId); //current user

            if (!user.followers.includes(req.body.userId)) { // check if already following the user
                await user.updateOne({ $push: { followers: req.body.userId } });
                await currUser.updateOne({ $push: { followings: req.params.id } });

                res.status(200).json('following');
            }
            else {
                res.status(403).json('You already follow the user')
            }
        } catch (err) {
            res.status(403).json(err);
        }
    } else {
        res.status(500).json('you cant follow yourself')
    }
})
//unfollow user
router.put("/:id/unfollow", authenticateToken, async (req, res) => {
    if (req.body.userId !== req.params.id) {
        try {
            const user = await User.findById(req.params.id);
            const currUser = await User.findById(req.body.userId);

            if (user.followers.includes(req.body.userId)) { //check if not following user already.
                await user.updateOne({ $pull: { followers: req.body.userId } });
                await currUser.updateOne({ $pull: { followings: req.params.id } });

                res.status(200).json('unfollowing');
            }
            else {
                res.status(403).json('already not following')
            }
        } catch (err) {
            res.status(403).json(err);
        }
    } else {
        res.status(500).json('you cant unfollow yourself')
    }
})

module.exports = router