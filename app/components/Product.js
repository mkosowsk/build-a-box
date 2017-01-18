import React from 'react';
import {Link} from 'react-router';

export default function (props) {

	const product = props.selectedProduct;
	const addProductToCart = props.addProductToCart;
	console.log("PRO ID:",product.id)

	return ( 
		<div className='product'>
			<div>
				<h3>{ product.name }</h3>
				<img src={ product.photoUrl } className ="img-thumbnail"/>
				<h4>{ product.description }</h4>
				<h4>$ { product.price }</h4>
				<Link to={`/products/${product.id}/reviews`}>
					<button type="button" className="btn btn-link">Reviews</button>
				</Link>
				<h4>{ product.stars }</h4>
				<Link to={'/cart'}>
					<button type="submit" className="btn btn-primary" onClick={() => addProductToCart(product)}>Add to Cart</button>
				</Link>
			</div>
		</div>
	);
}

