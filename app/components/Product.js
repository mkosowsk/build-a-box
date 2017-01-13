import React from 'react';

export default function (props) {

	const product = props.selectedProduct;

	return ( 
		<div className='product'>
			<div>
				<h3>{ product.name }</h3>
				<img src={ product.photoUrl } className ="img-thumbnail"/>
				<h4>{ product.description }</h4>
				<h4>$ { product.price }</h4>
				<h4>{ product.stars }</h4>
				<button type="submit" className="btn btn-primary" onclick={props.addProductToCart}>Add to Cart</button>
			</div>
		</div>
	);
}