'use strict'

const db = require('APP/db')
const Order = db.model('orders')

module.exports = require('express').Router()
 .get('/', (req, res, next) =>
   Order.findAll()
   .then(orders => res.json(orders))
   .catch(next))
 .post('/', (req, res, next) => {
 		console.log("BODY", req.body.content)
   let order = Order.build(req.body.content)
   order.save()
   .then(order => {
   		console.log("ORDER", order)	
 			res.status(201).json({
      message: 'Created successfully',
      order: order,
   		})
   	})
   .catch(next)
})