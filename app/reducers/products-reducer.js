import {
  RECEIVE_PRODUCTS
} from '../constants';

// import {convertAlbum, convertAlbums} from '../utils';

const initialProductsState = {
  list: [],
};

export default function (state = initialProductState, action) {

  const newState = Object.assign({}, state);

  switch (action.type) {

    case RECEIVE_PRODUCTS:
      newState.list = action.products;
      break;

    default:
      return state;

  }

  return newState;

}