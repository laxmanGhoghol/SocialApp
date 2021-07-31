import React from 'react'
import './ChatOnline.css'

export default function ChatOnline() {
    const PF = "http://localhost:8800/images/"

    return (
        <div className="chatOnline-container">
            <div className="chatOnlineFriend">
                <div className="chatOnlineImgContainer">
                    <img className="chatOnlineImg" src={PF + "noAvatar.png"} alt="" />
                    <div className="chatOnlineBadge"></div>
                </div>
                <span className="chatOnlineUsername">
                    Lakha Desai
                </span>
            </div>
        </div>
    )
}
