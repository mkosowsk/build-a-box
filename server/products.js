'use strict'

const db = require('APP/db')
const Product = db.model('products')

module.exports = require('express').Router()
  .get('/', (req, res, next) => 
    Product.findAll()
    .then(products => res.json(products))
    .catch(next))
  .post('/', (req, res, next) => 
    Product.create(req.body)
    .then(product => res.status(201).json({
      message: 'Created successfully',
      product: product,
    }))
    .catch(next))
  .get('/:id', (req, res, next) => 
    Product.findById(req.params.id)
    .then(foundProduct => {
      if (!foundProduct) res.sendStatus(404);
      else res.json(foundProduct)
    })
    .catch(next))
  .get('/:category', (req, res, next) => 
    Product.findByAll({
      where: {
        category: req.params.category,
      }
    })
    .then(products => {
      if (!products) res.sendStatus(404);
      else res.json(products)
    })
    .catch(next))
  .put('/:id', (req, res, next) => {
    console.log("any string hittin the route")
    Product.update(req.body, {
      where: {id: req.params.id},
      returning: true
    })
    .then(function (results) {
      var updated = results[1][0]
      // console.log("hello", updated)
      res.json({
        message: 'Updated successfully',
        product: updated
      })
    })
    .catch(function(err){
      console.log(err)
    })
  })
    // Product.findById(req.params.id)
    // .then(function (found) {
    //   if (!found) {
    //     var err = new Error('not found');
    //     err.status = 404;
    //     throw err;
    //   }
    //   return found.update(req.body);
    // })
    // .then(function (updated) {
    //   res.json({
    //     message: 'Updated successfully',
    //     product: updated
    //   });
    // })
    // .catch(next))

