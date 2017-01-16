
import React from 'react';
import {Link} from 'react-router';

export default function (props) {
  const reviews = props.reviews;

  return (
    <div className="container">
      <div className="row">
        <h3>Reviews</h3>
        {
          reviews && reviews.map(review => (
            <div className="col-xs-4" key={ review.id }>

              <div>
                  <h5>
                    <span>{ review.title }</span>
                  </h5>
                  <small>{ review.content } </small>
                  <small>Rating: { review.stars } </small>
                </div>
            </div>
          ))
        }
      </div>
    </div>
  );
};

// Add photo of product
              // <Link className="thumbnail" to={`/products/${product.id}`}>
              //   <img src={ product.photoUrl }/>
              // </Link>