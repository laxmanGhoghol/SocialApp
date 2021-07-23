import React from 'react'
import './RightBar.css'
export default function RightBar({ profile }) {
    const HomeRightBar = () => {
    const PF = "http://localhost:8800/images/"
        return (
            <>

                <div className="birthdayContainer">
                    <img src={PF + "gift.png"} alt="" className="birthdayImg" />
                    <span className="birthdayText">
                        <b>Laxman Desai</b> and <b>3 other friends</b> have a birthday today
                    </span>
                </div>
                <img src={PF + "rightImg.png"} alt="" className="rightbarAd" />
                <h4 className="rightbarTitle">
                    Online Friends
                </h4>
                <ul className="rightbarFriendList">
                    <li className="rightbarFriend">
                        <div className="rightbarProfileImgContainer">
                            <img className="rightbarProfileImg" src={PF + "2.jpeg"} alt="" />
                            <span className="rightbarOnline"></span>
                        </div>
                        <span className="rightbarUsername">Rita Desai</span>
                    </li>
                </ul>

            </>
        )
    }

    const ProfileRightBar = (user) => {
        return (
            <>
                <h4 className="rightbarProfileTitle">User Information</h4>
                <div className="rightbarInfo">
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoItemKey">
                            City: 
                        </span>
                        <span className="rightbarInfoItemValue">
                        {user.city}
                        </span>
                    </div>
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoItemKey">
                            From:
                        </span>
                        <span className="rightbarInfoItemValue">
                            {user.from}
                        </span>
                    </div>
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoItemKey">
                            Relationship:
                        </span>
                        <span className="rightbarInfoItemValue">
                            {user.relationship}
                        </span>
                    </div>
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoItemKey">
                            Followers:
                        </span>
                        <span className="rightbarInfoItemValue">
                            10
                        </span>
                    </div>
                </div>
                <h4 className="rightbarProfileTitle">User Friends</h4>
                <div className="rightbarFollowings">
                    <div className="rightbarFollowing">
                        <img src="assets/person/3.jpeg" alt="" className="rightbarFollowingImg" />
                        <span className="rightbarFollowingName">Someone hero</span>
                    </div>
                    <div className="rightbarFollowing">
                        <img src="assets/person/3.jpeg" alt="" className="rightbarFollowingImg" />
                        <span className="rightbarFollowingName">Someone hero</span>
                    </div>
                    <div className="rightbarFollowing">
                        <img src="assets/person/3.jpeg" alt="" className="rightbarFollowingImg" />
                        <span className="rightbarFollowingName">Someone hero</span>
                    </div>
                    <div className="rightbarFollowing">
                        <img src="assets/person/3.jpeg" alt="" className="rightbarFollowingImg" />
                        <span className="rightbarFollowingName">Someone hero</span>
                    </div>
                    <div className="rightbarFollowing">
                        <img src="assets/person/3.jpeg" alt="" className="rightbarFollowingImg" />
                        <span className="rightbarFollowingName">Someone hero</span>
                    </div>
                    <div className="rightbarFollowing">
                        <img src="assets/person/3.jpeg" alt="" className="rightbarFollowingImg" />
                        <span className="rightbarFollowingName">Someone hero</span>
                    </div>
                    <div className="rightbarFollowing">
                        <img src="assets/person/3.jpeg" alt="" className="rightbarFollowingImg" />
                        <span className="rightbarFollowingName">Someone hero</span>
                    </div>
                </div>

            </>

        )
    }
    return (
        <div className="rightbar-container">
            <div className="rightbarWrapper">
                {profile ? <ProfileRightBar user={profile}/> : <HomeRightBar/>}
            </div>
        </div>
    )
}
