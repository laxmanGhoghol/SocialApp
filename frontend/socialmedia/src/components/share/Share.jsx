import React from 'react'
import './Share.css'
import { PhotoLibrary, Label, LocationOn, EmojiEmotions } from '@material-ui/icons'

export default function Share() {
    const PF = "http://localhost:3000/assets/"

    return (
        <div className="share-container">
            <div className="shareWrapper">
                <div className="shareTop">
                    <img src={PF + "person/1.jpg"} className="ShareProfileImg" alt="" />
                    <input type="text" className="shareInput" placeholder="What's in your mind?" id="" />
                </div>
                <hr className="shareHr" />
                <div className="shareBottom">
                    <div className="shareBottomItem">
                        <PhotoLibrary htmlColor="tomato" className="shareBottomIcon" />
                        <span className="shareBottomText">Photo or Video</span>
                    </div>
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
                    <button className="shareBottomBtn">Share</button>
                </div>
            </div>
        </div>
    )
}
