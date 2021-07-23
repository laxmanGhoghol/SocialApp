import Share from '../share/Share'
import React, { useEffect, useState } from 'react'
import './Feed.css'
import Post from '../post/Post'
import api from '../../apiCalls'

export default function Feed() {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        const fetchposts = async () => {
            const res = await api.getPosts();
            setPosts(res.sort((p1, p2) =>{
                return new Date(p2.createdAt) - new Date(p1.createdAt)
            })
            )
        };
        fetchposts();
    }, [])
    return (
        <div className="feed-container">
            <div className="feedWrapper">
                <Share />
                {
                    posts.map((p, i) => <Post key={i} post = {p}/>)
                }
            </div>
        </div>
    )
}
