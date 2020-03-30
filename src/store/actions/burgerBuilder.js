import * as actionTypes from './actionTypes';
import axios from '../../axios-orders'

export const addIngredient = (ingName) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingridientName: ingName
    }
};

export const removeIngredient = (ingName) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingridientName: ingName
    }
};

export const setIngredients = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients
    };
}

export const fetchIngFailed = (error) => {
    return {
        type: actionTypes.FETCH_ING_FAILED
    };
}

export const initIngredients = () => (dispatch) => {
    axios.get('https://react-burger-app-51433.firebaseio.com/ingridients.json')
    .then(response => {
        dispatch(setIngredients(response.data))
    })
    .catch(error => {
        dispatch(fetchIngFailed())
    });
}