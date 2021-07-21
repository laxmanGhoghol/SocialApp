import Share from '../share/Share'
import React, { useEffect, useContext, useState } from 'react'
import './Feed.css'
import Post from '../post/Post'
import { AuthContext } from '../../context/AuthContext'
import axios from 'axios'

export default function Feed() {
    const { user } = useContext(AuthContext)
   const [posts, setPosts] = useState([])

    useEffect(()=>{
        const fetchposts  =  async ()=>{
            await axios.get("http://127.0.0.1:8800/api/posts/timeline/data",
             { headers: { 'Authorization': `Bearer ${user.accessToken}` } }
             ).then((res) => {
                 console.log(res.data.data[0].desc)
                setPosts(res.data.data)
            })
        };
        fetchposts();
    }, [])
    return (
        <div className="feed-container">
            <div className="feedWrapper">
                <Share />
                {
                    posts.map((p) => {
                        return <Post key={p._id} post={p}/>
                    }) 
                }
            </div>
        </div>
    )
}
