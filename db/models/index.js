'use strict';

// Require our models. Running each module registers the model into sequelize
// so any other part of the application could call sequelize.model('User')
// to get access to the User model.
const Guest = require('./guest')
const User = require('./user')
const Product = require('./product')
const Review = require('./review')
const Cart = require('./cart')
// const Order = require('./order')

const Order = require('./order')
User.hasMany(Review);
Product.hasMany(Review, {
	as: 'Reviews'
});
Review.belongsTo(Product);

User.belongsToMany(Product, {through: 'cart'});
Product.belongsToMany(User, {through: 'cart'});

Guest.belongsToMany(Product, {through: 'sessionCart'});
Product.belongsToMany(Guest, {through: 'sessionCart'});

Order.belongsTo(User);
User.hasMany(Order, { as: 'Orders'});
Product.hasMany(Order, { as: 'Orders'});


module.exports = {
	User,
	Product,
	Review,
	Cart,
	Guest,
	// Order
	Order
}