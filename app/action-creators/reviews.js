import { RECEIVE_REVIEWS } from '../constants';
import axios from 'axios';

export const receiveReviews = reviews => ({
    type: RECEIVE_REVIEWS,
    reviews
});
// Reviews
export const getReviewsByProductId = productId => {
  return dispatch => {
    axios.get(`/api/products/${productId}/reviews`)
      .then(response => {
        dispatch(receiveReviews(response.data));
      });
  };
};