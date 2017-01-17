const Sequelize = require('sequelize')
const db = require('APP/db')

const Order = db.define('orders', {
	total: {
		type: Sequelize.INTEGER,
		allowNull: false
	}

})

module.exports = Order