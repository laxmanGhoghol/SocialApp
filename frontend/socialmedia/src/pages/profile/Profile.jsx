import React from 'react'
import './Profile.css'
import TopBar from '../../components/topbar/TopBar'
import LeftBar from '../../components/leftbar/LeftBar'
import RightBar from '../../components/rightbar/RightBar'
import Feed from '../../components/feed/Feed'

export default function Profile() {
    return (
        <>
            <TopBar />
            <div className="profileContainer">
                <LeftBar />
                <div className="profileRight">
                    <div className="profileRightTop">
                        <div className="profileCover">
                            <img src="assets/posts/1.jpg" alt="" className="profileCoverImg" />
                            <img src="assets/person/2.jpeg" alt="" className="profileUserImg" />
                        </div>

                        <div className="profileInfo">
                            <h4 className="profileInfoName">laxman Desai</h4>
                            <span className="profileInfoDescription">Hello frineds, how are you</span>
                        </div>
                    </div>
                    <div className="profileRightBottom">
                        <Feed />
                        <RightBar profile/>
                    </div>
                </div>
            </div>
        </>
    )
}
