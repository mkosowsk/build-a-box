'use strict'

const Sequelize = require('sequelize')
const db = require('APP/db')
const Product = require('./product')

module.exports = db.define('reviews', {
	title: {
		type: Sequelize.TEXT,
		allowNull: false
	},
	content: {
		type: Sequelize.STRING,
		allowNull: false
	},
	stars: {
		type: Sequelize.INTEGER,
		validate: {
			isInt: true,
			min: 0,
			max: 5
		}
	}
});