import React, { useEffect, useState } from 'react'
import './ChatOnline.css'
import api from '../../apiCalls'

export default function ChatOnline({ onlineUsers, setCurrentChat, currUserId }) {
    const PF = "http://localhost:8800/images/"

    const [friends, setFriends] = useState([]);
    const [onlineFriends, setOnlineFriends] = useState([]);
   
    useEffect(()=>{
        api.getFriends().then((res)=>{
            setFriends(res);
        });

    }, [currUserId])
    useEffect(()=>{
        setOnlineFriends(friends.filter(f => onlineUsers.includes(f._id)));
    }, [onlineUsers, friends])
    const handleChatOnlineClick = (user)=>{
        console.log("clicked to chat", user)
        api.getConversationWithTwoId(currUserId, user._id).then((res)=>{
            setCurrentChat(res);
        })
    }
    return (
        <div className="chatOnline-container">
            {
                onlineFriends.map((u) => (
                    <div className="chatOnlineFriend" onClick={()=>{handleChatOnlineClick(u)}}>
                        <div className="chatOnlineImgContainer">
                            <img className="chatOnlineImg" src={PF + (u.profilePic ? u.profilePic : "noAvatar.png")} alt="" />
                            <div className="chatOnlineBadge"></div>
                        </div>
                        <span className="chatOnlineUsername">
                            {u.username}
                        </span>
                    </div>
                ))
            }
        </div>
    )
}
