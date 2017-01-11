'use strict'

/* eslint no-undef: 'off', no-console: 'off' */

const db = require('APP/db')
const Order = require('./order')
const {
	expect
} = require('chai')

describe('Order', () => {
	before('wait for the db', () => {
		db.didSync
	})

	let order;

	beforeEach(function() {
		order = Order.create({
			creditCard: 1111222233334444,
			billAddress: '42 Wallaby Way, Syndey',
			shipAddress: '42 Wallaby Way, Sydney',
			email: 'email@gmail.com',
			name: 'Email',
			status: 'Ordered',
			date: '1/1/2017',
			products: [{
				name: 'Asus780',
				description: "This is an Asus product",
				price: 100,
				photoUrl: 'fillmurray.com/400/400',
				category: 'CPU',
				stock: 4,
				quantity: 1
			}]
		})
	})

})