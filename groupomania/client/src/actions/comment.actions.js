import axios from "axios";

export const GET_COMMENTS = 'GET_COMMENTS';
export const CREATE_COMMENT = 'CREATE_COMMENT';
export const EDIT_COMMENT = 'EDIT_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';

export const getComments = () =>{
    return (dispatch) =>{
        return axios
            .get('http://localhost:3000/api/comment')
            .then((res) => dispatch({type : GET_COMMENTS, payload : res.data}))
            .catch((err) => console.log(err));
    };
};

export const createComment = (userId, postId, content) =>{
    return (dispatch) =>{
        return axios({
            method : 'post',
            url : 'http://localhost:3000/api/comment',
            data : {
                userId,
                postId,
                content,
            }
        })
            .then((res) => dispatch({type : CREATE_COMMENT, payload : res.data}))
            .catch((err) => console.log(err));
    };
};

export const editComment = (id, content) =>{
    return (dispatch) =>{
        return axios({
            method : 'put',
            url : `http://localhost:3000/api/comment/${id}`,
            data : {
                content
            }
        })
            .then((res) => dispatch({type : EDIT_COMMENT, payload : res.data}))
            .catch((err) => console.log(err));
    };
};

export const deleteComment = (id) =>{
    return (dispatch) =>{
        return axios({
            method : 'delete',
            url : `http://localhost:3000/api/comment/${id}`,
        })
            .then((res) => dispatch({type : DELETE_COMMENT, payload : res.data}))
            .catch((err) => console.log(err));
    }
}