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
import {receiveProducts} from './action-creators/products'

const onAppEnter = () => {

  // const products = axios.get('/products');
  axios.get('/api/products')
    .then(response => response.data)
    .then(products => {
      store.dispatch(receiveProducts(products));
    });
};

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
      </Route>
    </Router>
  </Provider>,
  document.getElementById('main')
)