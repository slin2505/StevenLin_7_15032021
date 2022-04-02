import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Uidcontext } from '../appContext';

const LikeButton = ({ post }) => {
    const [liked, setLiked] = useState(false);
    const uid = useContext(Uidcontext);
 
    const like = () =>{

    };

    useEffect(() =>{
        axios({
            method : 'post',
            url : `http://localhost:3000/api/post/likedByUser`,
            data : {
                postId : post,
                userId : uid
            }
        })
            .then((res) => {
                if (res.data.result !== null){
                    setLiked(true);
                };
            })
            .catch((err) => console.log(err));
    }, [uid, post, liked])

    return (
        <div className='like-container'>
            {uid && liked === false &&(
                <img src='./img/icons/heart.svg' onClick={like} alt='like-icon' />
            )}
            {uid && liked && (
                <img src='./img/icons/heart-filled.svg' onClick={like} alt='like-icon' />
            )}
        </div>
    );
};

export default LikeButton;