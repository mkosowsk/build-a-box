import {
  RECEIVE_USER
} from '../constants';


const initialUserState = {
  list: [],

};

export default function (state = initialUserState, action) {

  const newState = Object.assign({}, state);
  
  switch (action.type) {

    case RECEIVE_USER:
       newState.list = [action.user];
       
      
      break;


    default:
      return state;

  }

  return newState;

}