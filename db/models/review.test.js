'use strict'

const db = require('APP/db')
const Product = require('./product')
const Review = require('./review')
const {expect, assert} = require('chai')



describe('Review', function() {
  before('wait for the db', () => db.didSync)

  var review;

  beforeEach(function() {
    review = Review.build({
      title: 'This is a good product',
      content: "I dont see why this is necessary",
      stars: 5
    });

    review.save();
  });

  // afterEach(function () {
  //   return Product.truncate({ cascade: true });
  // });

  describe('Validation of fields', () => {

    it('Has all fields populated', function() {

      expect(review.title).to.be.a('string');
      expect(review.content).to.be.a('string');
      assert.isNumber(review.stars, 'the stars');


    })

    it('throws error if stars above 5', function() {
      review.stars = 10;

      return review.validate()
        .then((result) => {
          expect(result).to.be.an.instanceOf(Error);
          expect(result.message).to.contain('Validation error');
        })
    });

    it('throws error if stars below 0', function() {
      review.stars = -2;

      return review.validate()
        .then((result) => {
          expect(result).to.be.an.instanceOf(Error);
          expect(result.message).to.contain('Validation error');
        })
    })
  })

  describe('associations', () => {

    // Testing for Review.belongsTo(Product)

    it('Checks that a review belongs to a product', function() {

      return Product.create({
          name: 'Asus780',
          description: "This is an Asus product",
          price: 100,
          photoUrl: 'fillmurray.com/400/400',
          category: 'CPU',
          stock: 4
        })
        .then((product) => {
          review.setProduct(product);
        })
        .then(() => {
          return review.getProduct()
        })
        .then((product) => {
          expect(product.name).to.equal('Asus780');
        })

    })


  })
})