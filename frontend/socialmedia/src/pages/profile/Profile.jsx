import React, { useContext, useEffect, useState } from 'react'
import './Profile.css'
import TopBar from '../../components/topbar/TopBar'
import LeftBar from '../../components/leftbar/LeftBar'
import RightBar from '../../components/rightbar/RightBar'
import Feed from '../../components/feed/Feed'
import EditProfile from '../../components/EditProfile/EditProfile'
import { AuthContext } from '../../context/AuthContext';
import { Link, useParams } from 'react-router-dom'
import api from '../../apiCalls'

export default function Profile() {
    const PF = "http://localhost:8800/images/"
    const username = useParams().username
    const { user: curruser } = useContext(AuthContext)
    const [user, setUser] = useState({});
    
    useEffect(() => {
        if (username === curruser._id) {
            setUser(curruser);
        }
        else {
            api.getProfile(username).then((res) => {
                setUser(res);
            });
        }
    }, [user._id, username, curruser])

    const UserProfile = () => {
        return (
            <>
                <div className="profileContainer">
                    <LeftBar />
                    <div className="profileRight">
                        <div className="profileRightTop">
                            <div className="profileCover">
                                <img src={PF + (user.coverPic ? user.coverPic : "cover.jpg")} alt="" className="profileCoverImg" />
                                <img src={PF + (user.profilePic ? user.profilePic : "noAvatar.png")} alt="" className="profileUserImg" />
                            </div>

                            <div className="profileInfo">
                                <h4 className="profileInfoName">{user.username}</h4>
                                <span className="profileInfoDescription">{user.desc}</span>
                            </div>
                        </div>
                        <div className="profileRightBottom">
                            <Feed profilePosts={user._id}/>
                            <RightBar profile={user} />
                        </div>
                    </div>
                </div>
            </>
        )
    }

    const NoProfile = () => {
        return (
            <>
                <div className="noProfile">
                    <div className="noProfileText">User Profile Not found</div>
                    <Link to="/" style={{ color: "green" }}>Back to Homepage</Link>
                </div>
            </>
        )
    }
    const CurrUserProfile = () => {
        return (
            <>
                <div className="profileContainer">
                    <LeftBar />
                    <div className="profileRight">
                        <div className="profileRightTop">
                            <div className="profileCover">
                                <img src={PF + (user.coverPic ? user.coverPic : "cover.jpg")} alt="" className="profileCoverImg" />
                                <img src={PF + (user.profilePic ? user.profilePic : "noAvatar.png")} alt="" className="profileUserImg" />
                            </div>

                            <div className="profileInfo">
                                <h4 className="profileInfoName">{user.username}</h4>
                                <span className="profileInfoDescription">{user.desc}</span>
                            </div>
                        </div>
                        <div className="profileRightBottom">
                            <Feed profilePosts={user._id}/>
                            <RightBar profile={curruser} />
                            <EditProfile user={user}/>
                        </div>
                    </div>
                </div>
            </>
        )
    }
    return (
        <>
            <TopBar />
            {
                 (username === curruser._id) ? <CurrUserProfile /> : ((user === undefined || user._id == null) ? <NoProfile /> : <UserProfile />)
            }


        </>
    )
}
