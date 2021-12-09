import { csrfFetch } from './csrf';

// Action types
// To help prevent errors
const GET_COMMENTS = 'coffees/GET_COMMENTS'
const ADD_COMMENT = 'coffees/ADD_COMMENT'
const DELETE_COMMENT = 'coffees/DELETE_COMMENT'
const EDIT_COMMENT = 'coffees/EDIT_COMMENT'

// Actions
const loadComments = (comments) => {
    return {
        type: GET_COMMENTS,
        comments
    }
}

const addComment = (newComment) => {
    return {
        type: ADD_COMMENT,
        newComment
    }
}

const deleteComment = (commentId) => {
    return {
        type: DELETE_COMMENT,
        commentId
    }
}

const editComment = (editedCommentt) => {
    return {
        type: EDIT_COMMENT,
        editedCommentt
    }
}


// Thunk action creators
// Retrieve information from the database
export const getAllComments = () => async (dispatch) => {
    const response = await csrfFetch('/api/comments');
    if (response.ok) {
        const allComments = await response.json();
        dispatch(loadComments(allComments));
    }
}

export const addNewComment = newComment => async (dispatch) => {
    const response = await csrfFetch('/api/comments', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newComment)
    });
    if (response.ok) {
        const comment = await response.json();
        dispatch(addComment(comment));
        return comment;
    }
}

export const deleteThisComment = commentId => async (dispatch) => {
    const response = await csrfFetch(`/api/comments/${commentId}`, {
        method: 'DELETE',
    });
    if (response.ok) {
        dispatch(deleteComment(commentId));
    }
}

export const editThisComment = editedComment => async (dispatch) => {
    const response = await csrfFetch(`/api/coffees/${editedComment.coffeeId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(editedComment)
    });
    if (response.ok) {
        const data = await response.json();
        dispatch(editComment(data));
        return data;
    }
}

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
        case ADD_COMMENT:
            const prevState = {...state};
            prevState[action.newComment.id]=action.newComment;
            prevState.commentArray.push(action.newComment);
            prevState.commentArray = sortList(prevState.commentArray)
            return prevState;
        case DELETE_COMMENT:
            const newState = { ...state };
            delete newState[action.commentId];
            newState.commentArray = newState.commentArray.filter(
                comment => comment.id !== action.commentId
                )
            return newState;
        // case EDIT_COMMENT:
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
