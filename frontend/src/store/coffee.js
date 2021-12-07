import { csrfFetch } from './csrf';

// Action types
// To help prevent errors
const GET_COFFEES = 'coffees/GET_COFFEES'


// Actions
const loadCoffees = (list) => {
    return {
        type: GET_COFFEES,
        list
    }
}


// Thunk action creators
// Retrieve information from the database
export const getAllCoffees = () => async (dispatch) => {
    const response = await csrfFetch('api/coffees');
    if (response.ok) {
        const list = await response.json();
        dispatch(loadCoffees(list));
    }
}


// Reducer
// Replace state with database information from thunk
const coffeeReducer = (state = { list: []}, action) => {
    switch (action.type) {
        case GET_COFFEES:
            const allCoffees = {};
            action.list.allCoffees.forEach(coffee => {
                allCoffees[coffee.id] = coffee;
            });
            return {
                ...allCoffees,
                ...state,
                list: action.list.allCoffees
            };
        default:
            return state;
    }
}


export default coffeeReducer;
