import React from 'react';

export default function (props) {

	const cart = props.selectedCart;
	console.log(cart)
	return ( 
		<div className='cart'>
			<div>
				<h3>{ cart[0] }</h3>
			</div>
		</div>
	);
}

	// <img src={ product.photoUrl } className ="img-thumbnail"/>
	// 			<h4>{ product.description }</h4>
	// 			<h4>{ product.price }</h4>
	// 			<h4>{ product.rating }</h4>