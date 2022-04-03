import axios from "axios";

export const GET_POSTS = 'GET_POSTS';
export const CREATE_POST = 'CREATE_POST';
export const UPDATE_POST = 'UPDATE_POST';
export const DELETE_POST = 'DELETE_POST';

export const getPosts = (num) =>{
    return (dispatch) =>{
        return axios
            .get('http://localhost:3000/api/post')
            .then((res) => {
                const array = res.data.slice(0, num);
                dispatch({type : GET_POSTS, payload : array})
            })
            .catch((err) => console.log(err))
    };
};
export const createPost = (data) =>{
    return (dispatch) =>{
        return axios
            .post('http://localhost:3000/api/post', data)
    };
};

export const updatePost = (id, content) =>{
    return (dispatch) =>{
        return axios({
            method : 'put',
            url : `http://localhost:3000/api/post/${id}`,
            data : {
                content
            }
        })
            .then((res) => dispatch({type : UPDATE_POST, payload : {content, id}}))
            .catch((err) => console.log(err));
    };
};

export const deletePost = (id) =>{
    return (dispatch) =>{
        return axios({
            method : 'delete',
            url : `http://localhost:3000/api/post/${id}`,
        })
            .then((res) => dispatch({type : DELETE_POST, payload : id}))
            .catch((err) => console.log(err));
    };
};