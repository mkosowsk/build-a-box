import React from 'react';

export default function (props) {

	const cart = props.selectedCart;
	console.log(cart)
	return ( 
		<div className='cart'>
			<div>
				<h3>{ cart[0].name }</h3>
			</div>
		</div>
	);
}