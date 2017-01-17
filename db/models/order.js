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
     type: Sequelize.INTEGER,
     
 },
 expiration: {
     type: Sequelize.STRING,
     
 },
    totalPrice: {
        type: Sequelize.INTEGER,
        
    }
})

module.exports = Order