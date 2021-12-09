import { csrfFetch } from './csrf';

// Action types
// To help prevent errors
const GET_COMMENTS = 'coffees/GET_COMMENTS'
// const ADD_COFFEE = 'coffees/ADD_COFFEE'
// const DELETE_COFFEE = 'coffees/DELETE_COFFEE'
// const EDIT_COFFEE = 'coffees/EDIT_COFFEE'

// Actions
const loadComments = (comments) => {
    return {
        type: GET_COMMENTS,
        comments
    }
}

// const addCoffee = (newCoffee) => {
//     return {
//         type: ADD_COFFEE,
//         newCoffee
//     }
// }

// const removeCoffee = (coffeeId) => {
//     return {
//         type: DELETE_COFFEE,
//         coffeeId
//     }
// }

// const editCoffee = (revCoffee) => {
//     return {
//         type: EDIT_COFFEE,
//         revCoffee
//     }
// }


// Thunk action creators
// Retrieve information from the database
export const getAllComments = () => async (dispatch) => {
    const response = await csrfFetch('/api/comments');
    if (response.ok) {
        const allComments = await response.json();
        dispatch(loadComments(allComments));
    }
}

// export const addNewCoffee = newCoffee => async (dispatch) => {
//     const response = await csrfFetch('/api/coffees', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(newCoffee)
//     });
//     if (response.ok) {
//         const data = await response.json();
//         dispatch(addCoffee(data));
//         return data;
//     }
// }

// export const deleteThisCoffee = coffeeId => async (dispatch) => {
//     const response = await csrfFetch(`/api/coffees/${coffeeId}`, {
//         method: 'DELETE',
//     });
//     if (response.ok) {
//         dispatch(removeCoffee(coffeeId));
//     }
// }

// export const editThisCoffee = revCoffee => async (dispatch) => {
//     const response = await csrfFetch(`/api/coffees/${revCoffee.coffeeId}`, {
//         method: 'PUT',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(revCoffee)
//     });
//     if (response.ok) {
//         const data = await response.json();
//         dispatch(editCoffee(data));
//         return data;
//     }
// }

const sortList = (list) => {
    return list.sort((commentA, commentB) => {
      return commentB.id - commentA.id;
    });
  };

// Reducer
// Replace state with database information from thunk
const commentReducer = (state = { commentArray: [] }, action) => {
    switch (action.type) {
        case GET_COMMENTS:
            const allComments = {};
            action.comments.forEach(comment => {
                allComments[comment.id] = comment;
            });
            return {
                ...allComments,
                ...state,
                commentArray: sortList(action.comments)
            };
        // case ADD_COFFEE:
        //     const prevState = {...state};
        //     prevState[action.newCoffee.id]=action.newCoffee;
        //     prevState.list.push(action.newCoffee);
        //     return prevState;
        // case DELETE_COFFEE:
        //     const newState = { ...state };
        //     delete newState[action.coffeeId];
        //     newState.list = newState.list.filter(
        //         coffee => coffee.id !== action.coffeeId
        //         )
        //     return newState;
        // case EDIT_COFFEE:
        //     const editState = {...state};
        //     editState[action.revCoffee.id] = action.revCoffee;
        //     editState.list = editState.list.filter(
        //         coffee => coffee.id !== action.revCoffee.id
        //     );
        //     editState.list.push(action.revCoffee);
        //     return editState;
        default:
            return state;
    }
}


export default commentReducer;
