import React, { useContext } from 'react'
import './Profile.css'
import TopBar from '../../components/topbar/TopBar'
import LeftBar from '../../components/leftbar/LeftBar'
import RightBar from '../../components/rightbar/RightBar'
import Feed from '../../components/feed/Feed'
import { AuthContext } from '../../context/AuthContext';

export default function Profile() {
    const PF = "http://localhost:8800/images/"
    const { user } = useContext(AuthContext)

    return (
        <>
            <TopBar />
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
                        <Feed />
                        <RightBar profile={user}/>
                    </div>
                </div>
            </div>
        </>
    )
}
