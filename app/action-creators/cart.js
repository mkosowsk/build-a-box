import { RECEIVE_CART } from '../constants';
import axios from 'axios';

export const receiveCart = cart => ({
    type: RECEIVE_CART,
    cart
});

export const addProductToCart = product => ({
    type: RECEIVE_CARTPRODUCT,
    product
});

// export const getProductById = albumId => {
//   return dispatch => {
//     axios.get(`/api/albums/${albumId}`)
//       .then(response => {
//         dispatch(receiveAlbum(response.data));
//       });
//   };
// };