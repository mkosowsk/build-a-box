import { RECEIVE_PRODUCTS } from '../constants';
import axios from 'axios';

export const receiveProducts = products => ({
    type: RECEIVE_PRODUCTS,
    products
});

// export const getProductById = albumId => {
//   return dispatch => {
//     axios.get(`/api/albums/${albumId}`)
//       .then(response => {
//         dispatch(receiveAlbum(response.data));
//       });
//   };
// };