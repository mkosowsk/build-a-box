import React from 'react';
import {Link} from 'react-router';

export default function (props) {
 const orders = props.orders;
 // const products = props.products;

 return (
   <div className="container">
     <div className="row">
       <h3>Orders</h3>
       {
         orders && orders.map(order => (
           <div className="col-xs-4" key={ orders.id }>
             <div>
               <h5>{ order.id }</h5>
               <h5>${ order.total }</h5>
             </div>
           </div>
         ))
       }
     </div>
   </div>
 );
}