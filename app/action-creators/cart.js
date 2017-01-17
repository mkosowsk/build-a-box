import { RECEIVE_CART } from '../constants';
import axios from 'axios';

export const receiveCart = cart => ({
    type: RECEIVE_CART,
    cart
});


export const addProductToCart = product => {
    return dispatch => {
    	axios.post('/api/cart/', {product})
    		.then(() => {
    			
    			dispatch(receiveCart(product));
    		});
    };
};

export const removeProductFromCart = product => {
    return dispatch => {
    	axios.post(`/api/cart/`, {product})
    		.then(response => {
    			dispatch(receiveCart(response.data));
    		});
    };
};

export const getProductsOfUser = productId => {
  return dispatch => {
    axios.get(`/api/products/${productId}`)
      .then(response => {
        dispatch(receiveProduct(response.data));
      });
  };
};

