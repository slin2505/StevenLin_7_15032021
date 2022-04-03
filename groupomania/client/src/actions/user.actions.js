import axios from "axios";

export const GET_USER = 'GET_USER';
export const UPLOAD_PICTURE = 'UPLOAD_PICTURE';
export const UPDATE_BIO = 'UPDATE_BIO';
export const DELETE_USER = 'DELETE_USER';

export const getUser = (uid) =>{
    return (dispatch) =>{
        return axios
            .get(`http://localhost:3000/api/user/${uid}`)
            .then((res) =>{dispatch({ type : GET_USER, payload : res.data.user})})
            .catch((err) => console.log(err));
    };
};

export const uploadPicture = (data, id) =>{
    return (dispatch) =>{
        return axios 
            .put(`http://localhost:3000/api/user/${id}`, data)
            .then((res) => {
                return axios
                    .get(`http://localhost:3000/api/user/${id}`)
                    .then((res) => dispatch({ type : UPLOAD_PICTURE, payload : res.data.user.upload}))
            })
            .catch((err) => console.log(err));
    }
}

export const updateBio = (data, id) =>{
    return (dispatch) =>{
        return axios
            .put(`http://localhost:3000/api/user/${id}`, data)
            .then((res) =>{
                return axios
                    .get(`http://localhost:3000/api/user/${id}`)
                    .then((res) => dispatch({ type : UPDATE_BIO, payload : res.data.user}))
            })
            .catch((err) => console.log(err));
    };
};

export const deleteUser = (id) =>{
    return (dispatch) =>{
        return axios
            .delete(`http://localhost:3000/api/user/${id}`)
            .then((res) =>{
                return axios
                    .get(`http://localhost:3000/api/user/logout`)
            })
            .catch((err) => console.log(err));
    };
};