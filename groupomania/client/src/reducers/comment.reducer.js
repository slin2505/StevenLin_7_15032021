import { CREATE_COMMENT, DELETE_COMMENT, EDIT_COMMENT, GET_COMMENTS } from "../actions/comment.actions";

const initialState = {};

export default function commentsReducer(state = initialState, action){
    switch(action.type){
        case GET_COMMENTS :
            return action.payload;
        case CREATE_COMMENT :
            return action.payload;
        case EDIT_COMMENT : 
            return action.payload;
        case DELETE_COMMENT : 
            return action.payload;
        default :
            return state;
    };
};