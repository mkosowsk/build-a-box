import {
  RECEIVE_CART
} from '../constants';

// import {convertAlbum, convertAlbums} from '../utils';

const initialCartState = {
  list: [{
    id: 1,
    productsId: [1, 2],
    totalPrice: 0 
}],
};

export default function (state = initialCartState, action) {

  const newState = Object.assign({}, state);
  
  switch (action.type) {

    case RECEIVE_CART:
      newState.list = action.cart;
      break;

    default:
      return state;

  }

  return newState;

}