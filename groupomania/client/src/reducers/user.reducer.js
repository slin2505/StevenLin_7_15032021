import { GET_USER, UPDATE_BIO, UPLOAD_PICTURE } from "../actions/user.actions";

const initialState = {};

export default function userReducer(state = initialState, action){
    switch (action.type){
        case GET_USER : 
            return action.payload;

        case UPLOAD_PICTURE : 
            return {
                ...state,
                upload : action.payload,
            };
        
        case UPDATE_BIO :
            console.log(action.payload)
            return {
                ...state,
                first_name : action.payload.firstName,
                last_name : action.payload.lastName,
            };

        default : 
            return state;
    };
};