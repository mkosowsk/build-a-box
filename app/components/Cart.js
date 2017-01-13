import React from 'react';

export default function (props) {

	const cart = props.selectedCart;

	return ( 
		<div className='cart'>
			<div>
				<h3>{ cart.name }</h3>
			</div>
		</div>
	);
}

	// <img src={ product.photoUrl } className ="img-thumbnail"/>
	// 			<h4>{ product.description }</h4>
	// 			<h4>{ product.price }</h4>
	// 			<h4>{ product.rating }</h4>