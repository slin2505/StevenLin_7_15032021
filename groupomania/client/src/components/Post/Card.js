import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updatePost } from '../../actions/post.actions';
import { dateParser } from '../Utils';
import CardComment from './CardComment';
import DeleteCard from './DeleteCard';
import LikeButton from './LikeButton';

const Card = ({ post }) => {
    const id = post.id;
    const [isLoading, setIsLoading] = useState(true);
    const [isUpdated, setIsUpdated] = useState(false);
    const [textUpdate, setTextUpdate] = useState(null);
    const [showComment, setShowComment] = useState(false);
    const [commentCount, setCommentCount] = useState(0);
    const userData = useSelector((state) => state.userReducer);
    const usersData = useSelector((state) => state.usersReducer);
    const dispatch = useDispatch();
    
    const updateItem = () =>{
        if (textUpdate){
            dispatch(updatePost(post.id, textUpdate))
        };
        setIsUpdated(false);
    }
    const showUpdateButton = () =>{
        if(userData.id === post.user_id || userData.is_admin === true){
            return true;
        };
    };
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
                        {isUpdated === false  && <p>{post.content}</p>}
                        {isUpdated &&(
                            <div className='update-post'>
                                <textarea
                                    defaultValue={post.content}
                                    onChange={(e) => setTextUpdate(e.target.value)}
                                />
                                <div className='button-container'>
                                    <button className='btn' onClick={updateItem}>Valider Modification</button>
                                </div>
                            </div>
                        )}
                        {post.upload && <img src={post.upload} alt='card-pic' className='card-pic' />}
                        {post.video && <iframe width='500' height='300' src={post.video} frameBorder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowFullScreen title={post.id}/>}
                        {showUpdateButton() === true && (
                            <div className='button-container'>
                                <div onClick={() => setIsUpdated(!isUpdated)}>
                                    <img src='./img/icons/edit.svg' alt='edit' />
                                </div>
                                <DeleteCard id={id}/>
                            </div>
                        )}
                        <div className='card-footer'>
                            <div className='comment-icon'>
                                <img onClick={() => setShowComment(!showComment)} src='./img/icons/message1.svg' alt='comment' />
                                <span>{commentCount}</span>
                            </div>
                            <LikeButton id={id}/>
                        </div>
                        {showComment === true && <CardComment id={id} />}
                    </div>
                </>
            )}
        </li>
    );
};

export default Card;