'use strict'

const db = require('APP/db')
const bcrypt = require('bcrypt')
const Sequelize = require('sequelize')
const Review = require('./review.js');

module.exports = db.define('products', {
	name: {
		type: Sequelize.STRING,
		allowNull: false
	},
	photoUrl: {
		type: Sequelize.STRING,
		allowNull: false
	},
	description: {
		type: Sequelize.STRING,
		allowNull: false
	},
	price: {
		type: Sequelize.INTEGER,
		validate: {
			isNumeric: true,
		},
		allowNull: false
	},
	category: {
		type: Sequelize.STRING,
		validate: {
			isIn: [
				['CPU', 'Motherboard', 'Case', 'GPU', 'RAM', 'Power Supply', 'Sound Card', 'HDD', 'SSD', 'Monitor', 'Keyboard', 'Mouse', 'Speakers', 'Headphones', 'Mousepad']
			]
		}
	},
	stock: {
		type: Sequelize.INTEGER,
		validate: {
			isNumeric: true,

		},
		allowNull: false
	}

})