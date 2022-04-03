import React from 'react';
import { useDispatch } from 'react-redux';
import { deletePost, getPosts } from '../../actions/post.actions';

const DeleteCard = ({id}) => {
    const dispatch = useDispatch();

    const deleteQuote = () =>{
        dispatch(deletePost(id))
            .then(() => dispatch(getPosts()))
    };
    return (
        <div onClick={() => {
            if (window.confirm('Voulez-vous supprimer le post ?')){
                deleteQuote()
            }
        }}>
        <img src='./img/icons/trash.svg' alt='trash' />
        </div>
    );
};

export default DeleteCard;