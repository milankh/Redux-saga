
const initialState = {
    count: 0,
    name: 'Milan',
    age: 24
};

export default function reducer(state=initialState,action) {

    switch(action.type){
        case 'INCREMENT':
        return {
            ...state,
            count: state.count + 1
        };

        case 'DECREMENT':
        return {
            ...state,
            count: state.count - 1
        }

        case 'RESET':
        return {
            count: 0
        }

        default:
        return state
    }
}

function postReducer(state=initialState, action) {

    switch(action.type){
        case 'FETCH_POSTS':
        return {
            
        }

        default:
        return state
    }
}