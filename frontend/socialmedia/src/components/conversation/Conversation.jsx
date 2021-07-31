import React, { useEffect, useState } from 'react'
import api from '../../apiCalls';
import './Conversation.css'

export default function Conversation({ conversation, currUser }) {
    const PF = "http://localhost:8800/images/"

    const [user, setUser] = useState({});
    useEffect(() => {
        const friendId = conversation.members.find((m) => m !== currUser._id);
        api.getProfile(friendId).then((res) => {
            setUser(res);
        })
    }, [conversation, currUser])
    return (
        <div className="conversation-container">
            <img className="conversationImg" src={PF + (user.profilePic ? user.profilePic : "noAvatar.png") } alt="" />
            <span className="conversationName">{user.username}</span>
        </div>
    )
}
