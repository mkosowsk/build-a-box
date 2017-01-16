import { RECEIVE_REVIEWS } from '../constants';
import axios from 'axios';

export const receiveReviews = reviews => ({
    type: RECEIVE_REVIEWS,
    reviews
});
