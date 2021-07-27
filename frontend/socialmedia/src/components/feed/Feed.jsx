import Share from '../share/Share'
import React, { useContext, useEffect, useState } from 'react'
import './Feed.css'
import Post from '../post/Post'
import api from '../../apiCalls'
import { AuthContext } from '../../context/AuthContext'

export default function Feed({ profilePosts }) {
    const { user } = useContext(AuthContext)
    const [posts, setPosts] = useState([])
    useEffect(() => {
        const fetchposts = async () => {
            const res = await api.getPosts();
            setPosts(res.sort((p1, p2) => {
                return new Date(p2.createdAt) - new Date(p1.createdAt)
            })
            )
        };
        const fetchUserposts = async (pid) => {
            const res = await api.getUserPosts(pid);
            setPosts(res.sort((p1, p2) => {
                return new Date(p2.createdAt) - new Date(p1.createdAt)
            })
            )
        };
        if (profilePosts) {
            fetchUserposts(profilePosts);
        }
        else {
            fetchposts();
        }
    }, [profilePosts])
    return (
        <div className="feed-container">
            <div className="feedWrapper">
                {profilePosts ? ((profilePosts === user._id) ? <Share /> : "") : <Share />}
                {
                    posts.map((p, i) => <Post key={i} currUser={user._id} post={p} />)
                }
            </div>
        </div>
    )
}
