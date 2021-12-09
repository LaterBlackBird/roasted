import { csrfFetch } from './csrf';

// Action types
// To help prevent errors
const GET_CHECKINS = 'coffees/GET_CHECKINS'
const ADD_CHECKIN = 'coffees/ADD_CHECKIN'

// Actions
const loadCheckins = (checkins) => {
    return {
        type: GET_CHECKINS,
        checkins
    }
}

const addCheckin = (newCheckin) => {
    return {
        type: ADD_CHECKIN,
        newCheckin
    }
}


// Thunk action creators
// Retrieve information from the database
export const getAllCheckins = () => async (dispatch) => {
    const response = await csrfFetch('/api/checkins');
    if (response.ok) {
        const data = await response.json();
        dispatch(loadCheckins(data));
    }
}

export const addNewCheckin = newCheckin => async (dispatch) => {
    const response = await csrfFetch('/api/checkins', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newCheckin)
    });
    if (response.ok) {
        const data = await response.json();
        dispatch(addCheckin(data));
        return data;
    }
}

const sortList = (list) => {
  return list.sort((checkinA, checkinB) => {
    return checkinB.id - checkinA.id;
  });
};

// Reducer
// Replace state with database information from thunk
const checkinReducer = (state = { checkinArray: [] }, action) => {
    switch (action.type) {
        case GET_CHECKINS:
            const allCheckins = {};
            action.checkins.forEach(checkin => {
                allCheckins[checkin.id] = checkin;
            });
            return {
                ...allCheckins,
                ...state,
                checkinArray: sortList(action.checkins)
            };
        case ADD_CHECKIN:
            const prevState = {...state};
            prevState[action.newCheckin.id]=action.newCheckin;
            prevState.checkinArray.push(action.newCheckin);
            return prevState;
        default:
            return state;
    }
}


export default checkinReducer;
