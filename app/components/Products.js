
import React from 'react';
import {Link} from 'react-router';

export default function (props) {
  console.log('******', props)
  const products = props.products;

  return (
    <div className="container">
      <div className="row">
        <h3>Products</h3>
        {
          products && products.map(product => (
            <div className="col-xs-4" key={ product.id }>
              <Link className="thumbnail" to={`/products/${product.id}`}>
                <img src={ product.photoUrl }/>
              </Link>
              <div>
                  <h5>
                    <span>{ product.name }</span>
                  </h5>
                  <small>{ product.description } </small>
                  <small>{ product.price } </small>
                  <small>{ product.category } </small>
                  <small>{ product.stock } in stock</small>
                </div>
            </div>
          ))
        }
      </div>
    </div>
  );
};
