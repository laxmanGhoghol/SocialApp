import React from 'react'
import './Message.css'
import {format} from 'timeago.js'

export default function Message({own, message}) {
    const PF = "http://localhost:8800/images/"
    return (
        <div className={own ? "message-container own" : "message-container"}>
            <div className="messageTop">
                <img className="messageImg" src={PF + "noAvatar.png"} alt="" />
                <p className="messageText"> {message.text} </p>
            </div>
            <div className="messageBottom">
                {format(message.createdAt)}
            </div>
        </div>
    )
}
