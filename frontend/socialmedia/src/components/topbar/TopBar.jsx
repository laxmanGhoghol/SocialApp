import React from 'react'
import './TopBar.css'
import { Search, Person, Chat, Notifications } from '@material-ui/icons'

export default function TopBar() {
    return (
        <div className='topbar-container'>

            <div className="topbarLeft">
                <span className='logo'>Be_Social</span>
            </div>

            <div className="topbarCenter">
                <div className="searchBar">
                    <Search className="searchIcon"/>
                    <input placeholder="Search frineds and posts" className="searchInput" />
                </div>
            </div>
            <div className="topbarRight">
                <div className="topbarLinks">
                    <span className="tobarLink">Homepage</span>
                    <span className="tobarLink">Timeline</span>
                </div>
                <div className="topbarIcons">
                    <div className="topbarIconItem">
                        <Person />
                        <span className="topbarIconBadge">
                            1
                        </span>
                    </div>
                    <div className="topbarIconItem">
                        <Chat />
                        <span className="topbarIconBadge">
                            2
                        </span>
                    </div>
                    <div className="topbarIconItem">
                        <Notifications />
                        <span className="topbarIconBadge">
                            1
                        </span>
                    </div>
                    <img src="/assets/person/1.jpg" alt="" className="topbarImg" />
                </div>
            </div>

        </div>
    )
}
