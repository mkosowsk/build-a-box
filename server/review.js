'use strict'

const db = require('APP/db')
const Review = db.model('reviews')

module.exports = require('express').Router()
  .get('/products/:productId/reviews', (req, res, next) => {
    console.log("ID:",req.params.productId)
    Review.findAll({
      where: {product_id: req.params.productId}
    })
    .then(reviews => res.json(reviews))
    .catch(next)
  })

  .post('/products/:id/reviews', (req, res, next) =>
    Review.create(req.body)
    .then(review => res.status(201).json({
      message: 'Created successfully',
      review: review,
    }))
    .catch(next))
  .get('/products/:id/reviews/:reviewId', (req, res, next) => 
    Review.findById(req.params.reviewId)
    .then(review => {
      if (!review) res.sendStatus(404);
      else res.json(review)
    })
    .catch(next))
