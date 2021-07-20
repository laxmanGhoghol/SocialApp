import React from 'react'
import './Post.css'
import { MoreVert, ThumbUp } from '@material-ui/icons'

export default function Post(props) {
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
        console.log(id);
    }
    return (
        <div className="post-container">
            <div className="postWrapper">
                <div className="postTop">

                    <div className="postTopLeft">
                        <img src="./assets/person/1.jpg" className="postProfileImg" alt="" />
                        <span className="postUsername">Lakha ghoghol</span>
                        <span className="postDate">5 min ago</span>
                    </div>
                    <div className="postTopRight">
                        <MoreVert />
                    </div>

                </div>
                <div className="postCenter">
                    <span className="postText">Hey it's my firs post here:)</span>
                    <img src={"assets/posts/" + props.img} className="postImg" alt="" />
                </div>
                <div className="postBottom">
                    <div className="postBottomLeft">
                        <button className="postLikeIcon" onClick={()=>{likeHandler(props.id)}} > <ThumbUp id={props.id} /></button>
                        <span className="postLikeCounter">22 Likes</span>
                    </div>
                    <div className="postBottomRight">
                        <span className="postCommentText">9 Comments</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
