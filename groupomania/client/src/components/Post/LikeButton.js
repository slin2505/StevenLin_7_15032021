import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Uidcontext } from '../appContext';

const LikeButton = ({ id }) => {
    const [liked, setLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(0);
    const uid = useContext(Uidcontext);
 
    const likeUnlike = () =>{
        axios({
            method : 'post',
            url : 'http://localhost:3000/api/post/likeDislike',
            data : {
                postId : id,
                userId : uid
            }
        })
            .then((res) => {
                if (res.data.message === '+1 like'){
                    setLiked(true);
                } else{
                    setLiked(false);
                };
            })
            .catch((err) => console.log(err));
    };
    useEffect(() =>{

        // savoir si liked ou pas liked
        axios({
            method : 'post',
            url : `http://localhost:3000/api/post/likedByUser`,
            data : {
                postId : id,
                userId : uid
            }
        })
            .then((res) => {
                if (res.data.result !== null){
                    setLiked(true);
                };
            })
            .catch((err) => console.log(err));

        // like counter
        axios({
            method : 'post',
            url : 'http://localhost:3000/api/post/getLikes',
            data : {
                postId : id,
                userId : uid,
            }
        })
            .then((res) => setLikeCount(res.data.likes))
            .catch((err) => console.log(err));     
    }, [uid, id, liked])

    return (
        <div className='like-container'>
            {uid && liked === false &&(
                <img src='./img/icons/heart.svg' onClick={likeUnlike} alt='like-icon' />
            )}
            {uid && liked && (
                <img src='./img/icons/heart-filled.svg' onClick={likeUnlike} alt='like-icon' />
            )}
            <span>{likeCount}</span>
        </div>
    );
};

export default LikeButton;