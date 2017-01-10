'use strict'
/* eslint no-undef: 'off', no-console: 'off' */

const db = require('APP/db')
const Cart = require('./cart')
const { expect } = require('chai')
const Product = require('./product')

describe('Cart', () => {
	before('wait for the db', () => db.didSync)

	let cart;

	beforeEach(function() {
		cart = Cart.create({
			products: [{productId:1, quantity: 1},{productId: 2,quantity: 1}],
		})
		return cart.save()
	})

// May need to put cart.save() in each it statement

	describe('Validation of fields', () => {
		console.log(cart)

		xit('has all fields populated', function() {
			expect(cart.products).to.be.instanceof(Array)
		})
		
		xit('products are an array of objects', function() {
			expect(cart.products[0]).to.be.instanceof(Object)
			expect(cart.products[0]).to.be.instanceof(Object)
		})
	})

	describe('associations', () => {

		// Testing for cart.hasMany(Product, {as: 'Products'})

		xit('has associations multiple products and a user', function() {

			var productA = Product.create({ 
				name: 'Asus780',
				description: "This is an Asus product",
				price: 100,
				photoUrl: 'fillmurray.com/400/400',
				category: 'CPU',
				stock: 4
			})
			var productB = Product.create({
				name: 'Baller480',
				description: "This is a product",
				price: 50,
				photoUrl: 'fillmurray.com/400/400',
				category: 'GPU',
				stock: 10
			})
			var user = User.create({ name: 'Guy', email: 'guy@gmail.com'})
		
			return Promise.all([productA, productB, user])
			.then(([productA, productB, user]) => {
				var pA = cart.setProducts(productA)
				var pB = cart.setProducts(productB)
				var used = cart.setUser(user)

				return Promise.all([pA, pB, used])
			}).then(() => {
				return Cart.findOne({
					where: {userId: user.id},
					include: { model: Product, as: 'Products'}
				})
			}).then((cartWithEverything) => {
				expect(cartWithEverything.Products).to.exist;
				expect(cartWithEverything.Products[0].name).to.equal('Asus780')
				expect(cartWithEverything.getUser().name).to.equal('Guy')
			})
		})
	})

	describe('instanceMethods', function() {

		xit('has getTotal method', function() {

			var productA = Product.create({ 
				name: 'Asus780',
				description: "This is an Asus product",
				price: 100,
				photoUrl: 'fillmurray.com/400/400',
				category: 'CPU',
				stock: 4
			})
			var productB = Product.create({
				name: 'Asus480',
				description: "This is a product",
				price: 50,
				photoUrl: 'fillmurray.com/400/400',
				category: 'GPU',
				stock: 10
			})

			return Promise.all([productA, productB])
			.then(([productA, productB]) => {
				var pA = cart.setProducts(productA);
				var pB = cart.setProducts(productB);
			
				return Promise.all([pA, pB]);
			}).then(() => {
				expect(cart.getTotal).to.equal(150)	
			})
		})
	})
})
