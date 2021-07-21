import React, { useContext } from 'react'
import './TopBar.css'
import { Search, Person, Chat, Notifications } from '@material-ui/icons'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext';

export default function TopBar() {

    const { user } = useContext(AuthContext)
    const PF = "http://localhost:3000/assets/"
    return (
        <div className='topbar-container'>

            <div className="topbarLeft">
                <Link to="/" style={{ textDecoration: "none" }}>
                    <span className='logo'>Be_Social</span>
                </Link>
            </div>

            <div className="topbarCenter">
                <div className="searchBar">
                    <Search className="searchIcon" />
                    <input placeholder="Search frineds and posts" className="searchInput" />
                </div>
            </div>
            <div className="topbarRight">
                <div className="topbarLinks">
                    <Link to="/" style={{ textDecoration: "none", color: "white" }}>
                        <span className="tobarLink">Homepage</span>
                    </Link>
                    <Link to="/profile:use" style={{textDecoration: "none", color: "white"}}>
                        <span className="tobarLink">Profile</span>
                    </Link>
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
                    <img src={PF + "person/" + user.user.profilePic} alt="" className="topbarImg" />
                </div>
            </div>

        </div>
    )
}
