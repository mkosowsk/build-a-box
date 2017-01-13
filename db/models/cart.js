'use strict'

const Product = require('./product')

/*eslint no-undef:'off'*/

const db = require('APP/db')
const Sequelize = require('sequelize')

module.exports = db.define('carts', {
	products: {
		type: Sequelize.ARRAY(Sequelize.INTEGER)
		// Array of product_id's
	},
	totalPrice: {
		type: Sequelize.VIRTUAL,
		defaultValue: 0
	}
// }, 
// {
// 	hooks: {
// 		afterCreate: 
// 			function setTotalPrice (cart) {
// 				var total = 0
// 				cart.products.forEach((product) => {
// 					Product.findOne({
// 						where: { id: product}
// 						})
// 					.then((foundProduct) => {
// 						total += foundProduct.price
// 					})
// 				})
// 				cart.totalPrice = total
// 			}
// 	}
})

