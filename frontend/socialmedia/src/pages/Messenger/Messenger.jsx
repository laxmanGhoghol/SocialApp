import React, { useContext, useEffect, useRef, useState } from 'react'
import './Messenger.css'
import TopBar from '../../components/topbar/TopBar'
import Conversation from '../../components/conversation/Conversation'
import Message from '../../components/message/Message'
import ChatOnline from '../../components/chatOnline/ChatOnline'
import { AuthContext } from '../../context/AuthContext'
import api from '../../apiCalls'
import io from 'socket.io-client'

export default function Messenger() {
    const { user } = useContext(AuthContext);
    const [conversations, SetConversations] = useState([]);
    const [currentChat, SetcurrentChat] = useState(null); //current conversation
    const [messages, SetMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const scrollref = useRef();
    const socket = useRef(io("ws://localhost:8900"))

    useEffect(() => {
        socket.current.emit("addUser", user._id, localStorage.getItem('accessToken'));
        socket.current.on("getUsers", (users) => {
            console.log(users);
        });

    }, [user])

    useEffect(() => {
        api.getConversations().then((res) => {
            SetConversations(res);
        });
    }, [])

    useEffect(() => {
        if (currentChat != null) {
            api.getMessages(currentChat?._id).then((res) => {
                SetMessages(res);
            }).catch((err) => {
                console.log(err);
            });
        }
    }, [currentChat])

    useEffect(() => {
        scrollref?.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages])

    useEffect(() => {
        arrivalMessage && currentChat?.members.includes(arrivalMessage.senderId) &&
            SetMessages((prev) => [...prev, arrivalMessage]);
    }, [arrivalMessage, currentChat?.members])

    const handleMessageSend = (e) => {
        e.preventDefault();
        if (newMessage !== "") {
            const msg = {
                conversationId: currentChat._id,
                text: newMessage.trim(),
                senderId: user._id
            };
            api.sendMessage(msg);
            SetMessages([...messages, msg]); // adding new message to list
            setNewMessage("");   //setting user message to empty

            const receiverId = currentChat.members.find(member => member !== user._id); // get receivers id from current conversation

            //sending message to receiver with socket
            socket.current.emit("sendMessage", {
                senderId: user._id,
                receiverId: receiverId,
                text: newMessage
            })
        }
    }

    useEffect(() => {
        socket.current.on("getMessage", msg => {
            setArrivalMessage({
                senderId: msg.senderId,
                text: msg.text,
                createdAt: Date.now()
            });
        })
    }, [])

    return (
        <>
            <TopBar />
            <div className="messenger-container">
                <div className="chatMenu">
                    <div className="chatMenuWrapper">
                        <input className="chatMenuInput" type="text" placeholder="Search for friends" />
                        {
                            conversations.map((c, i) =>
                            (
                                <div key={i} onClick={() => SetcurrentChat(c)}>
                                    <Conversation key={i} currUser={user} conversation={c} />
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className="chatBox">
                    <div className="chatBoxWrapper">
                        {
                            currentChat ? <>
                                <div className="chatBoxTop">
                                    {messages.map((m, i) =>
                                        <div key={i} ref={scrollref}>
                                            <Message key={i} own={m.senderId === user._id} message={m} />
                                        </div>
                                    )}
                                </div>
                                <div className="chatBoxBottom">
                                    <textarea onChange={(e) => setNewMessage(e.target.value)} value={newMessage} className="chatMessageInput" placeholder="Right Something..."></textarea>
                                    <button onClick={handleMessageSend} className="chatSubmitBtn">Send</button>
                                </div>
                            </> : <span className="noCoversation">Open a conversation to start a chat</span>
                        }
                    </div>
                </div>
                <div className="ChatOnline">
                    <div className="chatOnlineWrapper">
                        <ChatOnline />
                    </div>
                </div>
            </div>
        </>
    )
}
