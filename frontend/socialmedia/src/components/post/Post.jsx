import React, { useEffect, useState } from 'react'
import './Post.css'
import { MoreVert, ThumbUp } from '@material-ui/icons'
import api from '../../apiCalls'

export default function Post({ post }) {
    const [user, setUser] = useState({ 'username': "" });
    useEffect(() => {
        const fetchusers = async () => {
            const res = await api.getProfile(post.userId)
            setUser(res)
        };
        fetchusers();
    }, [post.userId])
    const PF = "http://localhost:8800/images/"
    let isLiked = false;

    const likeHandler = (id) => {
        if (isLiked) {
            document.getElementById(id).style.color = "gray";
            api.disLikePost(post._id)
            isLiked = false;
        }
        else {
            document.getElementById(id).style.color = "black";
            api.likePost(post._id)
            isLiked = true;
        }
    }

    return (
        <div className="post-container">
            <div className="postWrapper">
                <div className="postTop">

                    <div className="postTopLeft">
                        <img src={PF + (user.profilePic ? user.profilePic : "noAvatar.png")} className="postProfileImg" alt="" />
                        <span className="postUsername">{user.username}</span>
                        <span className="postDate">5 minit</span>
                    </div>
                    <div className="postTopRight">
                        <MoreVert />
                    </div>

                </div>
                <div className="postCenter">
                    <span className="postText">{post.desc}</span>
                    <img src={PF + (post.img ? post.img : "")} className="postImg" alt="" />
                </div>
                <div className="postBottom">
                    <div className="postBottomLeft">
                        <button className="postLikeIcon" onClick={() => { likeHandler(post._id) }} > <ThumbUp id={post._id} /></button>
                        <span className="postLikeCounter">{post.likes.length}</span>
                    </div>
                    <div className="postBottomRight">
                        <span className="postCommentText">0 Comments</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
