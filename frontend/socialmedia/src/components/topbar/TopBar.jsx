import React, { useContext, useRef } from 'react'
import './TopBar.css'
import { Search, Person, Chat, Notifications } from '@material-ui/icons'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext';
import { useHistory } from 'react-router';
import api from '../../apiCalls'

export default function TopBar() {

    const { user, dispatch } = useContext(AuthContext)
    const PF = "http://localhost:8800/images/"
    const history = useHistory()
    const handleLogout = (e) =>{
        api.logout(dispatch); 
        history.push("/login")
    }
    const searckKey = useRef();
    const handleSearchSubmit = (e) =>{
        e.preventDefault();
        history.push("/Search/" + searckKey.current.value)
    }
    return (
        <div className='topbar-container'>

            <div className="topbarLeft">
                <Link to="/" style={{ textDecoration: "none" }}>
                    <span className='logo'>Be_Social</span>
                </Link>
            </div>

            <div className="topbarCenter">
                <form className="searchBar">
                    <Search className="searchIcon" />
                    <input ref={searckKey} placeholder="Search frineds and posts" className="searchInput" />
                    <button onClick={handleSearchSubmit} style={{display: "none"}} type="submit"></button>
                </form>
            </div>
            <div className="topbarRight">
                <div className="topbarLinks">
                    <Link to="/" style={{ textDecoration: "none", color: "white" }}>
                        <span className="tobarLink">Homepage</span>
                    </Link>
                    <Link to={"/profile/" + user._id} style={{textDecoration: "none", color: "white"}}>
                        <span className="tobarLink">Profile</span>
                    </Link>
                    <span onClick={handleLogout} className="tobarLink">Logout</span>
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
                    <img src={PF + (user.profilePic ? user.profilePic : "noAvatar.png")} alt="" className="topbarImg" />
                </div>
            </div>

        </div>
    )
}
