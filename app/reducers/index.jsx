import { combineReducers } from 'redux'
import productsReducer from './products-reducer'
import cartReducer from './cart-reducer'

const rootReducer = combineReducers({
  auth: require('./auth').default,
  products: productsReducer,
  cart: cartReducer,
})

export default rootReducer
