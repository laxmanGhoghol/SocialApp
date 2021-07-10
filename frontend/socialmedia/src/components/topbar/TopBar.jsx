import React from 'react'
import "./TopBar.css"
export default function TopBar() {
    return (
        <div className='top'>
            <div className="topLeft">
                <i className="topIcon fab fa-github"></i>
                <i className="topIcon fab fa-twitter-square"></i>
                <i className="topIcon fab fa-linkedin"></i>
            </div>
            <div className="topCenter">
                <ul className='topList'>
                    <li className='topListItem'>Home</li>
                    <li className='topListItem'>About</li>
                    <li className='topListItem'>Contacts</li>
                </ul>
            </div>
            <div className="topRight">
                <img className='topImg' src="https://media-exp1.licdn.com/dms/image/C4D03AQHmgwNNVNerdQ/profile-displayphoto-shrink_100_100/0/1622961276645?e=1629331200&v=beta&t=RN-1mu6UVWFt-tQMHl8DTPWu2z6-j_OX7QBlmCuyGN8" alt="" />
                <i class='topSearchIcon fas fa-search'></i>
            </div>
        </div>
    )
}
