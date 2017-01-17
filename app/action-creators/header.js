import { RECEIVE_USER } from '../constants';
import axios from 'axios';

export const receiveUser = user => ({
    type: RECEIVE_USER,
    user
});
