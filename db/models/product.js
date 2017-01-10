'use strict'

const bcrypt = require('bcrypt')
const Sequelize = require('sequelize')
const db = require('APP/db')
const Review = require('./review.js');

module.exports = db.define('products', {
	name: Sequelize.STRING,
	photoUrl: Sequelize.STRING,
	description: Sequelize.STRING,
	price: {
		type: Sequelize.INTEGER,
		validate: {
			isNumeric: true,
		},
		allowNull: false
	},
	category: {
		type:Sequelize.STRING,
		validate: {
			isIn: [['CPU', 'Motherboard', 'Case', 'GPU', 'RAM', 'Power Supply', 'Sound Card', 'HDD', 'SSD', 'Monitor', 'Keyboard', 'Mouse', 'Speakers', 'Headphones', 'Mousepad']]
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

