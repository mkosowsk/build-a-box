import { combineReducers } from 'redux'
import productsReducer from './products-reducer'
import cartReducer from './cart-reducer'
import reviewsReducer from './reviews-reducer'
import headerReducer from './header-reducer'

const rootReducer = combineReducers({
  auth: require('./auth').default,
  products: productsReducer,
  cart: cartReducer,
  reviews: reviewsReducer,
  header: headerReducer
})

export default rootReducer
