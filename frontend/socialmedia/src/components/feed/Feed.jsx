import Share from '../share/Share'
import React from 'react'
import './Feed.css'
import Post from '../post/Post'

export default function Feed() {
    return (
        <div className="feed-container">
            <div className="feedWrapper">
                <Share/>
                <Post id="e1" img="1.jpg"/>
                <Post id="e2" img="2.jpg"/>
                <Post id="e3" img="2.jpg"/>
                <Post id="e4" img="2.jpg"/>
            </div>
        </div>
    )
}
