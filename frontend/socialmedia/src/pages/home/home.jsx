import React from 'react'
import './Home.css'
import TopBar from '../../components/topbar/TopBar'
import LeftBar from '../../components/leftbar/LeftBar'
import RightBar from '../../components/rightbar/RightBar'
import Feed from '../../components/feed/Feed'



export default function Home() {
    return (
        <>
            <TopBar />
            <div className="homeContainer">
                <LeftBar />
                <Feed />
                <RightBar />
            </div>
        </>
    )
}
