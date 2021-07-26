import React, { useEffect, useState } from 'react'
import TopBar from '../../components/topbar/TopBar'
import LeftBar from '../../components/leftbar/LeftBar'
import RightBar from '../../components/rightbar/RightBar'
import Share from '../../components/share/Share'
import { Link, useParams } from 'react-router-dom'
import './SearchResult.css'
import api from '../../apiCalls'

export default function SearchResult() {
    const [userList, setUserList] = useState([]);
    const searchKey = useParams().searchKey;
    const PF = "http://localhost:8800/images/"

    useEffect(() => {
        api.searchUsers(searchKey).then((res) => {
            setUserList(res);
        })
    }, [searchKey])
    return (
        <>
            <TopBar />
            <div className="SearchResultHomeContainer">
                <LeftBar />
                <div className="SearchResult-container">
                    <div className="SearchResultWrapper">
                        <Share />
                        <h3 className="SearchResultText">Search Results: {userList.length}</h3>
                        {
                            userList.map(user =>
                                <div className="searchItemCotainer">
                                    <div className="searchItemWrapper">
                                        <div className="searchItem">
                                           <Link to={"/profile/" + user._id}><img src={PF + (user.profilePic? user.profilePic : "noAvatar.png")} alt="" className="searchItemImg" /></Link>
                                            <span className="searchItemName">{user.username}</span>
                                        </div>
                                    </div>
                                </div>

                            )
                        }
                    </div>
                </div>
                <RightBar />
            </div>
        </>
    )
}
