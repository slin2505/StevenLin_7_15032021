import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createComment, getComments } from '../../actions/comment.actions';
import { timestampParser } from '../Utils';
import EditDeleteComment from './EditDeleteComment';

const CardComment = ({id}) => {
    const [text, setText] = useState('');
    const userData = useSelector((state) => state.userReducer);
    const usersData = useSelector((state) => state.usersReducer);
    const commentsData = useSelector((state) => state.commentsReducer);
    const dispatch = useDispatch();

    const handleComment = (e) =>{
        e.preventDefault();

        if (text){         
            dispatch(createComment(userData.id, id, text))
                .then(() => dispatch(getComments()))
                .then(() => setText(''));
        };
    };

    return (
        <div className='comments-container'>
            {commentsData[0] !== undefined && commentsData.map((comment) =>{
                if (comment.post_id === id){
                    return (
                        <div className={comment.user_id === userData.id ? 'comment-container client' : 'comment-container'} key={comment.id}>
                            <div className='left-part'>
                                <img 
                                    src={usersData !== undefined && usersData.map((user) =>{
                                            if (user.id === comment.user_id) return user.upload;
                                            else return null;
                                        }).join('')
                                    }
                                    alt='userCommentImage'
                                />
                            </div>
                            <div className='right-part'>
                                <div className='comment-header'>
                                    <div className='pseudo'>
                                        <h3> {usersData !== undefined && usersData.map((user) =>{
                                                if (user.id === comment.user_id) return user.first_name + ' ' + user.last_name;
                                                else return null;
                                            }).join('')}
                                        </h3>
                                    </div>
                                    <span>{timestampParser(comment.createdAt)}</span>
                                </div>
                                <p>{comment.content}</p>
                                <EditDeleteComment comment={comment} />
                            </div>
                        </div>
                    )
                }else return null
            })}
            {userData.id &&(
                <form action='' onSubmit={handleComment} className='comment-form'>
                    <input type='text' name='text' onChange={(e) => setText(e.target.value)} value={text} placeholder='Ecriver un commentaire' />
                    <br />
                    <input type='submit' value='Valider' />
                </form>
            )}
        </div>
    );
};

export default CardComment;