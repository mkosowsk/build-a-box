const Sequelize = require('sequelize')
const db = require('APP/db')

const Order = db.define('orders', {
    billAddress: {
        type: Sequelize.STRING,
        
    },
    shipAddress: {
        type: Sequelize.STRING,

    },
    ccInfo: {
        type: Sequelize.TEXT,
     
    },
    expiration: {
        type: Sequelize.STRING,
     
    },
    totalPrice: {
        type: Sequelize.STRING,
        
    }
})

module.exports = Order