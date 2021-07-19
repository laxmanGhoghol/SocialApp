import Share from '../share/Share'
import React from 'react'
import './Feed.css'

export default function Feed() {
    return (
        <div className="feed-container">
            <div className="feedWrapper">
                <Share/>
            </div>
        </div>
    )
}
