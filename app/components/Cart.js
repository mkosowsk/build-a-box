import React from 'react';
// import p

export default function (props) {

	const cart = props.selectedCart;

	return ( 
		<div className='cart container'>
			<div className="row">
				<h3>Cart</h3>
			</div>
		</div>
	);
}



    // <div className="container">
    //   <div className="row">
    //     <h3>Products</h3>
    //     {
    //       products && products.map(product => (
    //         <div className="col-xs-4" key={ product.id }>
    //           <Link className="thumbnail" to={`/products/${product.id}`}>
    //             <img src={ product.photoUrl }/>
    //           </Link>
    //           <div>
    //               <h3>
    //                 <span>{ product.name }</span>
    //               </h3>
    //               <h5>{ product.description } </h5>
    //               <h5>${ product.price }.00 </h5>
    //               <h5>Category:  { product.category } </h5>
    //               <h5>{ product.stock } in stock</h5>
    //             </div>
    //         </div>
    //       ))
    //     }
    //   </div>
    // </div>


	// <img src={ product.photoUrl } className ="img-thumbnail"/>
	// 			<h4>{ product.description }</h4>
	// 			<h4>{ product.price }</h4>
	// 			<h4>{ product.rating }</h4>