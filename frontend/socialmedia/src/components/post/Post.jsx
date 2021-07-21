import React from 'react'
import './Post.css'
import { MoreVert, ThumbUp } from '@material-ui/icons'


export default function Post(props) {

    const PF = "http://localhost:3000/assets/"
    let isLiked = false;

    const likeHandler = (id) => {
        if (isLiked) {
            document.getElementById(id).style.color = "gray";
            isLiked = false;
        }
        else {
            document.getElementById(id).style.color = "black";
            isLiked = true;
        }
    }

    return (
        <div className="post-container">
            <div className="postWrapper">
                <div className="postTop">

                    <div className="postTopLeft">
                        <img src={PF + "person/1.jpg"} className="postProfileImg" alt="" />
                        <span className="postUsername">Lakha ghoghol</span>
                        <span className="postDate">5 min ago</span>
                    </div>
                    <div className="postTopRight">
                        <MoreVert />
                    </div>

                </div>
                <div className="postCenter">
                    <span className="postText">{props.post.desc}</span>
                    <img src={PF + props.post.img} className="postImg" alt="" />
                </div>
                <div className="postBottom">
                    <div className="postBottomLeft">
                        <button className="postLikeIcon" onClick={() => { likeHandler(props.post._id) }} > <ThumbUp id={props.post._id} /></button>
                        <span className="postLikeCounter">{props.post.likes.length}</span>
                    </div>
                    <div className="postBottomRight">
                        <span className="postCommentText">0 Comments</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
