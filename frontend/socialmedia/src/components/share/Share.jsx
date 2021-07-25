import React, { useContext, useRef, useState } from 'react'
import './Share.css'
import { PermMedia, Label, LocationOn, EmojiEmotions, Cancel } from '@material-ui/icons'
import api from '../../apiCalls'
import { AuthContext } from '../../context/AuthContext'

export default function Share() {

    const PF = "http://localhost:8800/images/"

    const { user } = useContext(AuthContext)

    const desc = useRef();
    const [file, setFile] = useState(null);
    const handleSubmit = (e) => {
        e.preventDefault();
        const newPost = {
            'desc': desc.current.value
        }
        if (file) {
            const data = new FormData();
            const filename = Date.now() + file.name;
            data.append("file", file, filename);
            newPost.img = filename;
            api.sharePost(newPost, data).then((res) => {
                if (res.data.ok) {
                    window.location.reload();
                }
            });

        } else {
            api.sharePost(newPost, null).then((res) => {
                if (res.data.ok) {
                    window.location.reload()
                }
            });
        }

    }
    return (
        <div className="share-container">
            <form className="shareWrapper">
                <div className="shareTop">
                    <img src={PF + (user.profilePic ? user.profilePic : "noAvatar.png")} className="ShareProfileImg" alt="" />
                    <input required ref={desc} type="text" className="shareInput" placeholder={"What's in your mind " + user.username + "?"} id="" />
                </div>
                <hr className="shareHr" />
                {file && (
                    <div className="shareImg-container">
                        <img className="shareImg" src={URL.createObjectURL(file)} alt="" />
                        <Cancel className="shareCancelImg" onClick={() => setFile(null)} />
                    </div>
                )}
                <div className="shareBottom">
                    <label htmlFor="file" className="shareBottomItem">
                        <PermMedia htmlColor="tomato" className="shareBottomIcon" />
                        <span className="shareBottomText">Photo or Video</span>
                        <input style={{ display: "none" }} type="file" id="file" accept=".png, .jpg, .jpeg" onChange={(e) => setFile(e.target.files[0])} />
                    </label>
                    <div className="shareBottomItem">
                        <Label htmlColor="blue" className="shareBottomIcon" />
                        <span className="shareBottomText">Tag</span>
                    </div>
                    <div className="shareBottomItem">
                        <LocationOn htmlColor="green" className="shareBottomIcon" />
                        <span className="shareBottomText">Location</span>
                    </div>
                    <div className="shareBottomItem">
                        <EmojiEmotions htmlColor="goldenrod" className="shareBottomIcon" />
                        <span className="shareBottomText">Feelings</span>
                    </div>
                    <button type="submit" onClick={handleSubmit} className="shareBottomBtn">Share</button>
                </div>
            </form>
        </div>
    )
}
