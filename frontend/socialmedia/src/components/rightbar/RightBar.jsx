import React, { useContext, useEffect, useState } from 'react'
import './RightBar.css'
import api from '../../apiCalls'
import { Link } from "react-router-dom";
import { AuthContext } from '../../context/AuthContext'
import { Add, Remove } from '@material-ui/icons'


export default function RightBar({ profile }) {

    const PF = "http://localhost:8800/images/"
    const {user: currUser} = useContext(AuthContext);
    const [followwed, setFollowed] = useState(currUser.followings.includes(profile?._id));
    const [friends, setFriends] = useState([]);

    useEffect(() => {
            api.getFriends().then((res) => {
                setFriends(res);
            })
    }, [profile])

    const handleFollowClick = (e) =>{
        if(followwed){
            api.unfollowUser(profile?._id);
            setFollowed(false);
        }
        else{
            api.followUser(profile?._id);
            setFollowed(true)
        }
    }

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
                            <img className="rightbarProfileImg" src={PF + "noAvatar.png"} alt="" />
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
            {user._id !== currUser._id && (
                <button className="rightbarFollowingBtn" onClick={handleFollowClick}>
                    {followwed ? (<>Unfollow <Remove/> </>) : (<>Follow <Add/> </>)}
                </button>
            )}
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
                               <Link to={"/profile/" + fnd._id} style={{ textDecoration: "none" }}><img src={ PF + (fnd.profilePic ? fnd.profilePic : "noAvatar.png")} alt="" className="rightbarFollowingImg" /></Link>
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
