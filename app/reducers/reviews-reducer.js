import {
  RECEIVE_REVIEWS
} from '../constants';

// import {convertAlbum, convertAlbums} from '../utils';

const initialReviewsState = {
  // selected:{},
  list: []
};

export default function (state = initialReviewsState, action) {

  const newState = Object.assign({}, state);
  
  switch (action.type) {

    case RECEIVE_REVIEWS:
      newState.list = action.reviews;
      break;
    // case RECEIVE_PRODUCT:
    //   newState.selected = action.product;
    //   break;  

    default:
      return state;

  }

  return newState;

}