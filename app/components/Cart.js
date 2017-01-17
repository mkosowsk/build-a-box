import React from 'react';
import {Link} from 'react-router'

export default function (props) {

   const cart = props.selectedCart;
   console.log(cart)
   let total = 0;
   cart.forEach(product => {
       total += product.price
   })

   function showCheckout() {
       var elem = document.getElementById('checkout')
       console.log('CLICKED', elem)
       if (elem.style.display === 'none') elem.style.display = 'block'
   }

   return (
       <div className='cart container'>
       <div className='row'>
               <h3>Cart</h3>
               
               {
                   cart && cart.map(product => (
                       <div key={ product.id }>
                           <h3>{ product.name }</h3>
                           <h5>${ product.price }.00 </h5>
                           <h5>Category:  { product.category } </h5>
                       </div>
                   ))
               }

                <div className='cartTotal' style={{marginTop: 50}}>
                    <h3>Total: ${total}.00</h3>
                </div>

               <div>
                   <button type='submit' className='btn btn-primary' onClick={showCheckout}>CHECKOUT</button>
               </div>

               <div id='checkout'  style={{display: "none"}}>
                   <form  className="checkoutForm">
                       <h6>Shipping Address:</h6><input name="shipAddress" />
                   </form>
                   <form className="checkoutForm">
                       <h6>Billing Address:</h6><input name="billAddress" />
                   </form>
                   <form className="checkoutForm">
                       <h6>Credit Card Number:</h6><input name="ccNumber" defaultValue="1234567812345678"/>
                   </form>
                   <form className="checkoutForm">
                       <h6>Expiration Date:</h6><input name="ccExpDate" defaultValue="06/20"/>
                   </form>
                   <button type='submit' className="btn btn-primary" style={{marginTop: 5, marginRight: 5}} onClick={() => {console.log("MAKE THIS FUCKING WORK")}} >ORDER</button>
               </div>

           </div>
       </div>
   );
}