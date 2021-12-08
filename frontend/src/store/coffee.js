import { csrfFetch } from './csrf';

// Action types
// To help prevent errors
const GET_COFFEES = 'coffees/GET_COFFEES'
const ADD_COFFEE = 'coffees/ADD_COFFEE'
const DELETE_COFFEE = 'coffees/DELETE_COFFEE'
const EDIT_COFFEE = 'coffees/EDIT_COFFEE'

// Actions
const loadCoffees = (list) => {
    return {
        type: GET_COFFEES,
        list
    }
}

const addCoffee = (newCoffee) => {
    return {
        type: ADD_COFFEE,
        newCoffee
    }
}

const removeCoffee = (coffeeId) => {
    return {
        type: DELETE_COFFEE,
        coffeeId
    }
}


// Thunk action creators
// Retrieve information from the database
export const getAllCoffees = () => async (dispatch) => {
    const response = await csrfFetch('/api/coffees');
    if (response.ok) {
        const list = await response.json();
        dispatch(loadCoffees(list));
    }
}

export const addNewCoffee = newCoffee => async (dispatch) => {
    const response = await csrfFetch('/api/coffees', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newCoffee)
    });
    if (response.ok) {
        const data = await response.json();
        dispatch(addCoffee(data));
    }
}

export const deleteThisCoffee = coffeeId => async (dispatch) => {
    const response = await csrfFetch(`/api/coffees/${coffeeId}`, {
        method: 'DELETE',
    });
    if (response.ok) {
        console.log(coffeeId);
        dispatch(removeCoffee(coffeeId));
    }
}


// Reducer
// Replace state with database information from thunk
const coffeeReducer = (state = { list: [] }, action) => {
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
        case ADD_COFFEE:
            const prevState = {...state};
            prevState[action.newCoffee.id]=action.newCoffee;
            prevState.list.push(action.newCoffee);
            return prevState;
        case DELETE_COFFEE:
            const newState = { ...state };
            delete newState[action.coffeeId];
            newState.list = newState.list.filter(
                coffee => coffee.id !== action.coffeeId
                )
            return newState;
        default:
            return state;
    }
}


export default coffeeReducer;
