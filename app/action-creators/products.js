import { RECEIVE_PRODUCTS, RECEIVE_PRODUCT } from '../constants';
import axios from 'axios';

export const receiveProducts = products => ({
    type: RECEIVE_PRODUCTS,
    products
});
export const receiveProduct = product => ({
    type: RECEIVE_PRODUCT,
    product
});

export const getProductById = productId => {
  return dispatch => {
    dispatch(receiveProduct(response.data));
    axios.get(`/api/products/${productId}`)
      .then(response => {
        dispatch(receiveProduct(response.data));
      });
  };
};

export const getProductsByCategory = categoryId => {
  return dispatch => {
    dispatch(receiveProducts(response.data));
    axios.get(`/api/products/category/${categoryId}`)
      .then(response => {
        return
      });
  };
};
