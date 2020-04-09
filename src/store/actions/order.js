import * as actionTypes from './actionTypes';
import axios from '../../axios-orders'

export const puchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    }
}

export const puchaseBurgerFail = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: error
    }
}

export const puchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    }
}

export const puchaseBurger = (orderData, token) => (dispatch) => {
    dispatch(puchaseBurgerStart()) 
    axios.post('/orders.json?auth='+token, orderData)
            .then(response => {
                dispatch(puchaseBurgerSuccess(response.data.name, orderData))
            })
            .catch(error => {
                dispatch(puchaseBurgerFail(error));
            });
};

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    }
};

export const fetchOrdersSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    }
};

export const fetchOrdersFail = (error) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAIL,
        error: error
    }
};

export const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START
    }
};

export const fetchOrders = (token) => (dispatch) => {
    dispatch(fetchOrdersStart());
    axios.get('/orders.json?auth='+ token)
        .then(response => {
            const fetchedOrders = [];
            for (let key in response.data) {
                fetchedOrders.push({
                    ...response.data[key],
                    id: key
                })
            }
            dispatch(fetchOrdersSuccess(fetchedOrders))
        })
        .catch(err => {
            dispatch(fetchOrdersFail(err))
        });
}
