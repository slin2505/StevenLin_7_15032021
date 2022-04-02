import axios from "axios";

export const GET_POSTS = 'GET_POSTS';

export const getPosts = () =>{
    return (dispatch) =>{
        return axios
            .get('http://localhost:3000/api/post')
            .then((res) => dispatch({type : GET_POSTS, payload: res.data}))
            .catch((err) => console.log(err))
    }
}