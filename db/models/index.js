'use strict';

// Require our models. Running each module registers the model into sequelize
// so any other part of the application could call sequelize.model('User')
// to get access to the User model.

const User = require('./user')
const Product = require('./product')
const Review = require('./review')
const Cart = require('./cart')

User.hasMany(Review);
Product.hasMany(Review, {
	as: 'Reviews'
});
Review.belongsTo(Product);
User.belongsToMany(Product, {through: 'cart'});
Product.belongsToMany(User, {through: 'cart'});


module.exports = {
	User,
	Product,
	Review,
	Cart
}