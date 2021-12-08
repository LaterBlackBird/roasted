import { csrfFetch } from './csrf';

// Action types
// To help prevent errors
const GET_COFFEES = 'coffees/GET_COFFEES'
const ADD_COFFEE = 'coffees/ADD_COFFEE'
const DELETE_COFFEE = 'coffees/DELETE_COFFEE'

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
            if (!state[action.newCoffee.id]) {
                const newState = {
                    ...state,
                    [action.newCoffee.id]: action.newCoffee
                };
                const newCoffeeList = newState.list.map(id => newState[id]);
                newCoffeeList.push(action.newCoffee);
                return newState;
            }
            return {
                ...state,
                [action.allCoffee.id]: {
                    ...state[action.newCoffee.id],
                    ...action.newCoffee
                }
            };
        case DELETE_COFFEE:
            const newState = { ...state };
            delete newState[action.coffeeId];
            newState.list.filter(
                coffee => coffee.id !== action.coffeeId
                )
            return newState;
        default:
            return state;
    }
}


export default coffeeReducer;
