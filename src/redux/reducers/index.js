import { combineReducers } from "redux";

const initialState = [];

const collection_data = (state = initialState, action)=>{
    if(action.type === 'FETCH_DATA'){
        return action.payload;
    }    
     return state;
}

export const rootReducers = combineReducers({
    collection_data
})