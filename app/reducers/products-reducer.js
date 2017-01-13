import {
  RECEIVE_PRODUCTS, RECEIVE_PRODUCT
} from '../constants';

// import {convertAlbum, convertAlbums} from '../utils';

const initialProductsState = {
  selected:{},
  list: []
};

export default function (state = initialProductsState, action) {

  const newState = Object.assign({}, state);
  
  switch (action.type) {

    case RECEIVE_PRODUCTS:
      newState.list = action.products;
      break;
    case RECEIVE_PRODUCT:
      newState.selected = action.product;
      break;  

    default:
      return state;

  }

  return newState;

}