import React, { useEffect, useState } from 'react'
import './Post.css'
import { MoreVert, ThumbUp } from '@material-ui/icons'
import api from '../../apiCalls'
import { format } from 'timeago.js';
import { Link } from 'react-router-dom';

export default function Post({ post, currUser }) { 
    const [user, setUser] = useState({ 'username': "" });
    const [likes, setLikes] = useState(post.likes.length)
    const [isLiked, setIsLiked] = useState(post.likes.includes(currUser))

    useEffect(() => {
        const fetchusers = async () => {
            const res = await api.getProfile(post.userId)
            setUser(res)
        };
        fetchusers();
    }, [post.userId])
    
    const PF = "http://localhost:8800/images/"

    const likeHandler = (id) => {
        if (isLiked) {
            document.getElementById(id).style.color = "gray";
            api.disLikePost(post._id)
            setLikes(likes - 1)
            setIsLiked(false);
        }
        else {
            document.getElementById(id).style.color = "black";
            api.likePost(post._id)
            setLikes(likes + 1)
            setIsLiked(true);
        }
    }

    return (
        <div className="post-container">
            <div className="postWrapper">
                <div className="postTop">

                    <div className="postTopLeft">
                        <Link to={"/profile/" + user._id}><img src={PF + (user.profilePic ? user.profilePic : "noAvatar.png")} className="postProfileImg" alt="" /></Link>
                        <span className="postUsername">{user.username}</span>
                        <span className="postDate">{format(post.createdAt)}</span>
                    </div>
                    <div className="postTopRight">
                        <MoreVert />
                    </div>

                </div>
                <div className="postCenter">
                    <span className="postText">{post.desc}</span>
                    <img src={(post.img ? (PF + post.img) : "")} className="postImg" alt="" />
                </div>
                <div className="postBottom">
                    <div className="postBottomLeft">
                        <button style={{color: isLiked ? "black" : "gray"}} className="postLikeIcon" onClick={() => { likeHandler(post._id) }} > <ThumbUp id={post._id} /></button>
                        <span className="postLikeCounter">{likes}</span>
                    </div>
                    <div className="postBottomRight">
                        <span className="postCommentText">0 Comments</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
