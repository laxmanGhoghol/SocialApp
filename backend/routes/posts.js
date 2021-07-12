const Post = require('../models/Post');
const User = require('../models/User');
const router = require('express').Router();

//create post
router.post('/', async (req, res) => {
    const newPost = new Post(req.body)
    try {
        const saved = await newPost.save();
        res.status(200).json(saved);
    } catch (err) {
        res.status(403).json(err);
    }
});

//update post
router.put('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.userId === req.body.userId) {
            await post.updateOne({$set: req.body})
            res.status(200).json('updated');
        }
        else {
            res.status(403).json('you can update only your posts')
        }
    } catch (err) {
        res.status(500).json(err)
    }

});
//delete post
router.delete('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.userId === req.body.userId) {
            await post.deleteOne();
            res.status(200).json('deleted');
        }
        else {
            res.status(403).json('you can delete only your posts')
        }
    } catch (err) {
        res.status(500).json(err)
    }

});
//like post
router.put('/:id/like', async (req, res)=> {
try {
    const post = await Post.findById(req.params.id);
    if(!post.likes.includes(req.body.userId)){
        await post.updateOne({$push: {likes: req.body.userId}});
        res.status(200).json('liked');
    }
    else{
        await post.updateOne({$pull : {likes: req.body.userId}})
        res.status(200).json('unliked');
    }
} catch (err) {
    res.status(500).json(err);
}
});
//get post
router.get('/:id', async(req, res)=>{
    try {
        const post = await Post.findById(req.params.id);
        res.status(200).json(post)
    } catch (err) {
        res.status(500).json('post not found');
    }
});

//get list of posts
router.get('/timeline/data', async(req, res)=>{
    try {
        const user = await User.findById(req.body.userId);
        const userPosts = await Post.find({userId: user._id});
        const friendsPosts = await Promise.all(
            user.followings.map((friendsId) => {
                return Post.find({userId: friendsId});
            })
        )
        res.status(200).json(userPosts.concat(...friendsPosts));
    } catch (err) {
        res.status(404).json(err)
    }
});
module.exports = router