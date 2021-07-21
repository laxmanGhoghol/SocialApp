import React, { useContext, useEffect } from 'react'
import './Home.css'
import TopBar from '../../components/topbar/TopBar'
import LeftBar from '../../components/leftbar/LeftBar'
import RightBar from '../../components/rightbar/RightBar'
import Feed from '../../components/feed/Feed'
import { AuthContext } from '../../context/AuthContext';



export default function Home() {
    const { user } = useContext(AuthContext)

    useEffect(() => {
        localStorage.setItem('user', JSON.stringify(user))
    }, [])
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
