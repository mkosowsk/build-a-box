import { combineReducers } from 'redux'
import productsReducer from './products-reducer'
import cartReducer from './cart-reducer'
import reviewsReducer from './reviews-reducer'
import ordersReducer from './orders-reducer'

const rootReducer = combineReducers({
  auth: require('./auth').default,
  products: productsReducer,
  cart: cartReducer,
  reviews: reviewsReducer,
  orders: ordersReducer
})

export default rootReducer
