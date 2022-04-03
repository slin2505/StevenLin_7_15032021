import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getComments } from '../actions/comment.actions';
import { getPosts } from '../actions/post.actions';
import Card from './Post/Card';

const Thread = () => {
    const [loadPost, setLoadPost] = useState(true);
    const [loadComment, setLoadComment] = useState(true);
    const posts = useSelector((state) => state.postReducer);
    const [count, setCount] = useState(5);
    const dispatch = useDispatch()

    const loadMore = () =>{
        if (window.innerHeight + document.documentElement.scrollTop + 1 > document.scrollingElement.scrollHeight){
            setLoadPost(true);
        }
    };

    useEffect(() =>{
        if (loadPost) {
            dispatch(getPosts(count));
            setLoadPost(false);
            setCount(count + 5);
        }
        
        if (loadComment){
            dispatch(getComments());
            setLoadComment(false);
        };

        window.addEventListener('scroll', loadMore);
            return() => window.removeEventListener('scroll', loadMore);
    }, [loadPost, dispatch, count, loadComment])
    
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