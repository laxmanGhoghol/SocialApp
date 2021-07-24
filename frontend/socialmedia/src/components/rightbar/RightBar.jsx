import React, { useEffect, useState } from 'react'
import './RightBar.css'
import api from '../../apiCalls'

export default function RightBar({ profile }) {

    const PF = "http://localhost:8800/images/"

    const [friends, setFriends] = useState([]);
    useEffect(() => {
            api.getFriends().then((res) => {
                setFriends(res);
            })
    }, [])


    const HomeRightBar = () => {
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

    const ProfileRightBar = ({ user }) => {
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
                            {user.followers.length}
                        </span>
                    </div>
                </div>
                <h4 className="rightbarProfileTitle">User Friends</h4>
                <div className="rightbarFollowings">
                    {
                        friends.map((fnd, i) => (
                            <div key={i} className="rightbarFollowing">
                                <img src={ PF + (fnd.profilePic ? fnd.profilePic : "noAvatar.png")} alt="" className="rightbarFollowingImg" />
                                <span className="rightbarFollowingName">{fnd.username}</span>
                            </div>
                        ))
                    }


                </div>

            </>

        )
    }
    return (
        <div className="rightbar-container">
            <div className="rightbarWrapper">
                {profile ? <ProfileRightBar user={profile} /> : <HomeRightBar />}
            </div>
        </div>
    )
}
