'use strict'
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
import {receiveProducts, getProductById} from './action-creators/products'
import CartContainer from './containers/CartContainer';

const onAppEnter = () => {

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

const onCartEnter = (nextRouterState) => {

  // const cartId = nextRouterState.params.cartId;

  axios.get('/api/cart')
    .then(response => response.data)
    .then(products => {
      store.dispatch(receiveProducts(products));
    });
  store.dispatch(getProductById(cartId));

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
      <Route path="/" component={App} onEnter={onAppEnter}>
        <IndexRedirect to="/products" />
        <Route path="/products" component={ProductsContainer} />
        <Route path="/products/:productId" component={ProductContainer} onEnter={onProductEnter}/>
        <Route path="/:cartId" component={CartContainer} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('main')
)