import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteComment, editComment } from '../../actions/comment.actions';
import { getComments } from '../../actions/comment.actions';

const EditDeleteComment = ({comment}) => {
    const [isAuthor, setIsAuthor] = useState(false);
    const [edit, setEdit] = useState(false);
    const [text, setText] = useState('');
    const userData = useSelector((state) => state.userReducer);
    const dispatch = useDispatch();

    const handleEdit = (e) =>{
        e.preventDefault();

        if (text){
            dispatch(editComment(comment.id, text))
                .then(() => dispatch(getComments()))
            setText('');
            setEdit(false);
        };
    };

    const handleDelete = () =>{
        dispatch(deleteComment(comment.id))
            .then(() => dispatch(getComments()))
    };

    useEffect(() =>{
        const checkAuthor = () =>{
            if (userData.id === comment.user_id || userData.is_admin === true){
                setIsAuthor(true)
            };
        };

        checkAuthor()
    }, [userData, comment])

    return (
        <div className='edit-comment'>
            {isAuthor && edit === false &&(
                <span onClick={() => setEdit(!edit)}>
                    <img src='./img/icons/edit.svg' alt='commentEdit' />
                </span>
            )}
            {isAuthor && edit === true &&(
                <form action='' onSubmit={handleEdit} className='edit-comment-form'>
                    <label htmlFor='text' onClick={() => setEdit(!edit)}>Editer</label>
                    <br />
                    <input type='text' name='text' onChange={(e) => setText(e.target.value)} defaultValue={comment.content} />
                    <br />
                    <div className='btn'>
                        <span onClick={() =>{
                            if (window.confirm('Voulez-vous supprimer ce commentaire ?')){
                                    handleDelete();
                                };
                            }}>
                            <img src='./img/icons/trash.svg' alt='delete' />
                        </span>
                        <input type='submit' value='Modifier' />
                    </div>
                </form>
            )}
        </div>
    );
};

export default EditDeleteComment;