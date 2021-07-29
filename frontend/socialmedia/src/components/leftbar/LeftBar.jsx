import React from 'react'
import './LeftBar.css'
import {RssFeed, HelpOutline, WorkOutline, Event, School, Bookmark, Group, PlayCircleFilledOutlined, Chat} from '@material-ui/icons'
export default function LeftBar() {
    return (
        <div className="leftbar-container">
            <div className="leftbarWrapper">
                <ul className="leftbarList">
                    <li className="leftbarListItem">
                        <RssFeed className="leftbarIcon"/>
                        <span className="leftbarListItemText">Feed</span>
                    </li>
                    <li className="leftbarListItem">
                        <Chat className="leftbarIcon" />
                        <span className="leftbarListItemText">Chats</span>
                    </li>
                    <li className="leftbarListItem">
                        <PlayCircleFilledOutlined className="leftbarIcon" />
                        <span className="leftbarListItemText">Videos</span>
                    </li>
                    <li className="leftbarListItem">
                        <Group className="leftbarIcon" />
                        <span className="leftbarListItemText">Groups</span>
                    </li>
                    <li className="leftbarListItem">
                        <Bookmark className="leftbarIcon" />
                        <span className="leftbarListItemText">BookMarks</span>
                    </li>
                    <li className="leftbarListItem">
                        <HelpOutline className="leftbarIcon" />
                        <span className="leftbarListItemText">Questions</span>
                    </li>
                    <li className="leftbarListItem">
                        <WorkOutline className="leftbarIcon" />
                        <span className="leftbarListItemText">Jobs</span>
                    </li>
                    <li className="leftbarListItem">
                        <Event className="leftbarIcon" />
                        <span className="leftbarListItemText">Events</span>
                    </li>
                    <li className="leftbarListItem">
                        <School className="leftbarIcon" />
                        <span className="leftbarListItemText">Courses</span>
                    </li>
                </ul>
                <button className="leftbarBtn">Show More</button>
                <hr className="leftbarHr"/>
                <ul className="leftbarFriendList">
                    <li className="leftbarFriend">
                        <img src="" alt="" className="leftbarFriendImg" />
                        <span className="leftbarFriendName">Lakha Desai</span>
                    </li>
                </ul>
            </div>
        </div>
    )
}
