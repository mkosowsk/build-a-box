
const Sequelize = require('sequelize')
const db = require('APP/db')


const Guest = db.define('guests', {
  
    guestId:{
      type: Sequelize.TEXT
    }
});

module.exports = Guest