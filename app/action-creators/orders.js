import { RECEIVE_ORDERS } from '../constants';
import axios from 'axios';

export const receiveOrders = orders => ({
    type: RECEIVE_ORDERS,
    orders
});