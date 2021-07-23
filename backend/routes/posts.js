const Post = require('../models/Post');
const User = require('../models/User');
const router = require('express').Router();
const jwt = require('jsonwebtoken')

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
//create post
router.post('/', authenticateToken, async (req, res) => {
    try {
        req.body.userId = req.user.userId;
        const newPost = new Post(req.body)
        const saved = await newPost.save();
        res.status(200).json({'ok': true});
    } catch (err) {
        res.status(400).json({'ok': false});
    }
});

//update post
router.put('/:id', authenticateToken, async (req, res) => {
    req.body.userId = req.user.userId;
    try {
        const post = await Post.findById(req.params.id);
        if (post.userId === req.body.userId) {
            await post.updateOne({$set: req.body})
            res.status(200).json({'ok': true});
        }
        else {
            res.status(400).json({'ok': false})
        }
    } catch (err) {
        res.status(500).json({'ok': false})
    }

});
//delete post
router.delete('/:id', authenticateToken, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.userId === req.user.userId) {
            await post.deleteOne();
            res.status(200).json({'ok': true});
        }
        else {
            res.status(400).json({'ok': false})
        }
    } catch (err) {
        res.status(500).json({'ok': false})
    }

});
//like post
router.put('/:id/like', authenticateToken, async (req, res)=> {
try {
    const post = await Post.findById(req.params.id);
    if(!post.likes.includes(req.user.userId)){
        await post.updateOne({$push: {likes: req.user.userId}});
        res.status(200).json({'ok': true});
    }
    else{
        await post.updateOne({$pull : {likes: req.user.userId}})
        res.status(200).json({'ok': true});
    }
} catch (err) {
    res.status(500).json({'ok': false});
}
});
//get post
router.get('/:id', authenticateToken, async(req, res)=>{
    try {
        const post = await Post.findById(req.params.id);
        res.status(200).json({'ok': true, 'data': post})
    } catch (err) {
        res.status(500).json({'ok': false});
    }
});

//get list of posts
router.get('/timeline/data', authenticateToken, async(req, res)=>{
    try {
        const user = await User.findById(req.user.userId);
        const userPosts = await Post.find({userId: user._id});
        const friendsPosts = await Promise.all(
            user.followings.map((friendsId) => {
                return Post.find({userId: friendsId});
            })
        )
        res.status(200).json({'ok': true, 'data': userPosts.concat(...friendsPosts)});
    } catch (err) {
        res.status(404).json({'ok': false})
    }
});
module.exports = router