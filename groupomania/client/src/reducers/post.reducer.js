import { DELETE_POST, GET_POSTS, UPDATE_POST } from "../actions/post.actions";

const initialState = {};

export default function postReducer(state = initialState, action){
    switch (action.type){
        case GET_POSTS :
            return action.payload;
        case UPDATE_POST :
            return state.map((post) =>{
                if (post.id === action.payload.id) {
                    return {
                        ...post,
                        content : action.payload.content
                    };
                } else return post;
            });
        case DELETE_POST :
            return state.filter((post) => post.id !== action.payload.id);
        default :
            return state;
    }
}