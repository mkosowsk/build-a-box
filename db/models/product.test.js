'use strict'

const db = require('APP/db')
const Product = require('./product')
const Review = require('./review');
const {expect, assert} = require('chai')


describe('Product', () => {
  before('wait for the db', () => db.didSync)

  var photoUrl = 'fillmurray.com/400/400'
  var fullText = "This is an Asus product";
  var product;

  beforeEach(function() {
    product = Product.build({
      name: 'Asus780',
      description: fullText,
      price: 100,
      photoUrl: photoUrl,
      category: 'CPU',
      stock: 4
    });

    product.save();
  });

  // afterEach(function () {
  //   return Product.truncate({ cascade: true });
  // });

  describe('Validation of fields', () => {

    it('Has all fields populated', function() {


      expect(product.name).to.be.a('string');
      expect(product.description).to.be.a('string');
      assert.isNumber(product.price, 'the price');
      expect(product.photoUrl).to.be.a('string');
      expect(product.category).to.be.a('string');
      assert.isNumber(product.stock, 'the stock');

    })

    // Use isIn validator

    it('throws error if category is not from predefined categories', function() {
      product.category = 'dog';

      return product.validate()
        .then((result) => {
          expect(result).to.be.an.instanceOf(Error);
          expect(result.message).to.contain('Validation error');
        })
    })
  })

  describe('associations', () => {

    // Testing for product.hasMany(Review, {as: 'Reviews'})

    it('Checks that a review belongs to a product and a products has many reviews', function() {

      var reviewA = Review.create({
        title: 'GOOD',
        content: 'this is my content',
        stars: 3
      })
      var reviewB = Review.create({
        title: 'Terrible',
        content: 'Next content',
        stars: 1
      })

      return Promise.all([reviewA, reviewB])
        .then(function([reviewA, reviewB]) {
          return product.setReviews([reviewA, reviewB]);
        })
        .then(() => {
          return product.getReviews();
        })
        .then((reviews) => {
          expect(reviews[0].title).to.equal('GOOD');
        })
    })
  })

})