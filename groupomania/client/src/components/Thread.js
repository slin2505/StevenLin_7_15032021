import React from 'react';
import { useSelector } from 'react-redux';
import Card from './Post/Card';

const Thread = () => {
    const posts = useSelector((state) => state.postReducer);
    
    return (
        <div className='thread-container'>
            <ul>
                {posts[0] !== undefined && posts.map((post) =>{
                    return <Card post={post} key={post.id} />;
                })}
            </ul>
        </div>
    );
};

export default Thread;