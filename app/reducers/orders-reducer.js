import {
 RECEIVE_ORDERS
} from '../constants';

// import {convertAlbum, convertAlbums} from '../utils';

const initialOrdersState = {
 list: []
};

export default function (state = initialOrdersState, action) {

 const newState = Object.assign({}, state);
 
 switch (action.type) {

   case RECEIVE_ORDERS:
     newState.list = action.orders;
     break;

   default:
     return state;

 }

 return newState;

}