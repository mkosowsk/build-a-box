import { RECEIVE_USER } from '../constants';
import axios from 'axios';

export const receiveUser = user => ({
    type: RECEIVE_USER,
    user
});

export const createUser = content => {
    console.log("CONTENT",content);
    axios.post('api/users', {content})
        .then(() => {
            console.log('Success for user')
        }).catch((err) => {
            console.log(err)
        })
}
