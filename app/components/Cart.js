import React from 'react';
import {Link, browserHistory} from 'react-router'
import {createOrder} from '../action-creators/cart'

export default function (props) {

   const cart = props.selectedCart;
   let total = 0;
   cart.forEach(product => {
       total += product.price
   })

   function showCheckout() {
       var elem = document.getElementById('checkout')
       if (elem.style.display === 'none') elem.style.display = 'block'
   }

    // function makeOrder(e) {
    //     e.preventDefault()
    //     var elem = document.getElementById('checkout')
    //     createOrder()

    //     {billAddress: elem.elements.billAddress.value}
    // }

    function handleSubmit(e){
        e.preventDefault()


        let formData = {
            name: e.target.name.value,
            shipAddress: e.target.shipAddress.value,
            billAddress: e.target.billAddress.value,
            ccInfo: e.target.ccNumber.value,
            expiration: e.target.ccExpDate.value,
            totalPrice: e.target.totalPrice.value,
        }


        createOrder(formData)
        browserHistory.push('/orders')
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

               <form id='checkout' className="checkoutForm" style={{display: "none"}} onSubmit={(e)=>(handleSubmit(e))}>
                    <h6>Name:</h6><input name="name" />
                    <h6>Shipping Address:</h6><input name="shipAddress" />
                    <h6>Billing Address:</h6><input name="billAddress" />
                    <h6>Credit Card Number:</h6><input name="ccNumber" defaultValue="1234567812345678"/>
                    <h6>Expiration Date:</h6><input name="ccExpDate" defaultValue="06/20"/>
                    <h6>Total Price:</h6><input name="totalPrice" value={`${total}.00`} />
                    <button type='submit' className="btn btn-primary" style={{marginTop: 5, marginRight: 5}}>ORDER</button>
               </form>

           </div>
       </div>
   );
}