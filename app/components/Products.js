
import React from 'react';
import {Link} from 'react-router';

export default function (props) {
  const products = props.products;
  function shorten(string) {
    if (string.length > 15) {
      string = string.slice(0,15) + '...'
    }
    return string
  }

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
                  <h3>
                    <span>{ shorten(product.name) }</span>
                  </h3>
                  <h5>${ product.price }.00 </h5>
                  <h5>Category:  { product.category } </h5>
                  <h5>{ product.stock } in stock</h5>
                </div>
            </div>
          ))
        }
      </div>
    </div>
  );
};


