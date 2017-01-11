'use strict'

const db = require('APP/db')
const Product = db.model('product')

module.exports = require('express').Router()
  .get('/products', (req, res, next) => 
    Product.findAll()
    .then(products => res.json(products))
    .catch(next))
  .post('/products', (req, res, next) => 
    Product.create(req.body)
    .then(product => res.status(201).json({
      message: 'Created successfully',
      product: product,
    }))
    .catch(next))
  .get('/products/:id', (req, res, next) => 
    Product.findById(req.params.id)
    .then(product => {
      if (!product) res.sendStatus(404);
      else res.json(product)
    })
    .catch(next))
  .get('/products/:category', (req, res, next) => 
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
  .put('/products/:id', (req, res, next) =>
    Product.findById(req.params.id)
    .then(function (found) {
      if (!found) {
        var err = new Error('not found');
        err.status = 404;
        throw err;
      }
      return found.update(req.body);
    })
    .then(function (updated) {
      res.json({
        message: 'Updated successfully',
        product: updated
      });
    })
    .catch(next))

