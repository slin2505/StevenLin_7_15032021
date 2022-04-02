import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { dateParser } from '../Utils';
import LikeButton from './LikeButton';

const Card = ({ post }) => {
    const id = post.id;
    const [isLoading, setIsLoading] = useState(true);
    const [commentCount, setCommentCount] = useState(0);
    const userData = useSelector((state) => state.userReducer);
    const usersData = useSelector((state) => state.usersReducer);
        
    useEffect(() =>{
        userData !== undefined && setIsLoading(false);
        const getCommentCount = async() =>{
            await axios({
                method : 'get',
                url : `http://localhost:3000/api/comment/count/${id}`,
            })
                .then((res) => setCommentCount(res.data.count))
                .catch((err) => console.log(err));
        };
        getCommentCount()
    }, [userData, id]);

    return (
        <li className='card-container' key={post.id}>
            {isLoading ?(
                <p className='card-loading'>Chargement en cours ...</p>
            ) : (
                <>
                    <div className='card-left'>
                        <img 
                            src={usersData !== undefined && usersData.map((user) =>{
                                    if (user.id === post.user_id) return user.upload;
                                    else return null;
                                }).join('')
                            }
                            alt='userImage'
                        />
                    </div>
                    <div className='card-right'>
                        <div className='card-header'>
                            <div className='pseudo'>
                                <h3>
                                    {usersData !== undefined && usersData.map((user) =>{
                                            if (user.id === post.user_id) return user.first_name + ' ' + user.last_name;
                                            else return null;
                                        }).join('')
                                    }
                                </h3>
                            </div>
                            <span>{dateParser(post.createdAt)}</span>
                        </div>
                        <p>{post.content}</p>
                        {post.upload && <img src={post.upload} alt='card-pic' className='card-pic' />}
                        {post.video && <iframe width='500' height='300' src={post.video} frameBorder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowFullScreen title={post.id}/>}
                        <div className='card-footer'>
                            <div className='comment-icon'>
                                <img src='./img/icons/message1.svg' alt='comment' />
                                <span>{commentCount}</span>
                            </div>
                            <LikeButton post={post.id}/>
                            <img src='./img/icons/share.svg' alt='share' />
                        </div>
                    </div>
                </>
            )}
        </li>
    );
};

export default Card;