import { csrfFetch } from './csrf';

// Action types
// To help prevent errors
const GET_CHECKINS = 'coffees/GET_CHECKINS'
const ADD_CHECKIN = 'coffees/ADD_CHECKIN'

// Actions
const loadCheckins = (list) => {
    return {
        type: GET_CHECKINS,
        list
    }
}

// const addCheckin = (newCoffee) => {
//     return {
//         type: ADD_CHECKIN,
//         newCoffee
//     }
// }


// Thunk action creators
// Retrieve information from the database
export const getAllCheckins = () => async (dispatch) => {
    const response = await csrfFetch('/api/checkins');
    if (response.ok) {
        const data = await response.json();
        dispatch(loadCheckins(data));
        console.log(`this is return`, data)
    }
}

// export const addNewCheckin = newCoffee => async (dispatch) => {
//     const response = await csrfFetch('/api/checkins', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(newCoffee)
//     });
//     if (response.ok) {
//         const data = await response.json();
//         dispatch(addCheckin(data));
//         return data;
//     }
// }



// Reducer
// Replace state with database information from thunk
const checkinReducer = (state = { list: [] }, action) => {
    switch (action.type) {
        case GET_CHECKINS:
            const allCheckins = {};
            // action.list.allCoffees.forEach(coffee => {
            //     allCheckins[coffee.id] = coffee;
            // });
            return {
                ...allCheckins,
                ...state,
                list: action.list.allCheckins
            };
        case ADD_CHECKIN:
            const prevState = {...state};
            prevState[action.newCoffee.id]=action.newCoffee;
            prevState.list.push(action.newCoffee);
            return prevState;
        default:
            return state;
    }
}


export default checkinReducer;
