import React from 'react';

export default function (props) {

    const cart = props.selectedCart;
    console.log(cart)
    let total = 0;
    cart.forEach(product => {
    	total += product.price
    })
    return (
        <div className='cart container'>
            <div className='row'>
                <h3>Cart</h3>
            	{
            		cart && cart.map(product => (
		            	<div key={ product.id }>
	                  <h3>
	                    <span>{ product.name }</span>
	                  </h3>
	                  <h5>{ product.description } </h5>
	                  <h5>${ product.price }.00 </h5>
	                  <h5>Category:  { product.category } </h5>
                	</div>
            		))
            	}
       				

       				<div className='cartTotal' style={{marginTop: 50}}>
       					<h3>Total: ${total}.00</h3>
       				</div>
            </div>
        </div>
    );
} 