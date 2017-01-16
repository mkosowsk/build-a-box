// 'use strict'
import React from 'react'
import {Router, Route, IndexRedirect, browserHistory} from 'react-router'
import {render} from 'react-dom'
import {connect, Provider} from 'react-redux'
import axios from 'axios'

import App from './components/App'
import store from './store'
// import Jokes from './components/Jokes'
// import Login from './components/Login'
// import WhoAmI from './components/WhoAmI'
import ProductsContainer from './containers/ProductsContainer'
import ProductContainer from './containers/ProductContainer'
import ReviewsContainer from './containers/ReviewsContainer'
import CartContainer from './containers/CartContainer';
import {receiveProducts, getProductById, getProductsByCategory} from './action-creators/products'
import {receiveReviews, getReviewsByProductId} from './action-creators/reviews'

const onProductsEnter = () => {
  console.log('RUNNING')
  // const products = axios.get('/products');
  axios.get('/api/products')
    .then(response => response.data)
    .then(products => {
      store.dispatch(receiveProducts(products));
    });
};

const onProductEnter = (nextRouterState) => {

  const productId = nextRouterState.params.productId;
  store.dispatch(getProductById(productId));

}



const onReviewsEnter = (nextRouterState) => {

  store.dispatch(getReviewsByProductId());

}

const onCartEnter = (nextRouterState) => {

  // const cartId = nextRouterState.params.cartId;

  axios.get('/api/cart')
    .then(response => response.data)
    .then(products => {
      store.dispatch(receiveProducts(products));
    });
  store.dispatch(getProductById(cartId));

}

const onCategoryEnter = (nextRouterState) => {

  const categoryId = nextRouterState.params.categoryId;
  store.dispatch(getProductsByCategory(categoryId));

}


// const ExampleApp = connect(
//   ({ auth }) => ({ user: auth })
// ) (
//   ({ user, children }) =>
//     <div>
//       <nav>
//         {user ? <WhoAmI/> : <Login/>}
//       </nav> 
//       {children}
//     </div>
// )

render (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App} >
        <IndexRedirect to="/products" />
        <Route path="/products" component={ProductsContainer} onEnter={onProductsEnter} />
        <Route path="/products/category/:categoryId" component={ProductsContainer} onEnter={onCategoryEnter} />
        <Route path="/products/:productId" component={ProductContainer} onEnter={onProductEnter} />
        <Route path="/products/:productId/reviews" component={ReviewsContainer} onEnter={onReviewsEnter} />
        <Route path="/products/:productId" component={ProductContainer} onEnter={onProductEnter}/>
        <Route path="/cart/:cartId" component={CartContainer} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('main')
)