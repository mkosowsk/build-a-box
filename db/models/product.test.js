'use strict'

const db = require('APP/db')
const Product = require('./product')
const {expect} = require('chai')

describe('Product', () => {
  before('wait for the db', () => db.didSync)

  var photoUrl = 'fillmurray.com/400/400'
  var fullText = "This is an Asus product";
  var product;

  beforeEach(function(){
    product = Product.build({
      name: 'Asus780',
      description: fullText,
      price: 100,
      photoUrl: photoUrl,
      category: 'CPU',
      stock: 4
    });
  });

  // afterEach(function () {
  //   return Product.truncate({ cascade: true });
  // });

  describe('Validation of fields', () => {

    it('Has all fields populated', function(){
      return product.save().then(function(product){
          expect(product.name).to.be.a('string');
          expect(product.description).to.be.a('string');
          assert.isNumber(product.price, 'the price');
          expect(product.photoUrl).to.be.a('string');
          expect(product.category).to.be.a('string');
          assert.isNumber(product.stock, 'the stock');
      })
    })

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
    var reviewA = Review.create({ Text: 'GOOD SHIT', Stars: 3 })
    var reviewB = Review.create({ Text: 'Terrible', Stars: 1 })

    // Testing for product.hasMany(Review, {as: 'Reviews'})

    return Promise.all([reviewA, reviewB])
      .then(function([reviewA, reviewB]) {
        product.setReviews(reviewA)
        product.setReviews(reviewB)
      })

    Product.findOne({
      where: {name: 'Asus780'}
      include: { model: Review, as: 'Reviews'}
    })
    .then((productWithReviews) => {
      expect(productWithReviews.Reviews).to.exist; 
      expect(productWithReviews.Reviews[0].Text).to.equal('GOOD SHIT');
    })

  })

  describe('getterMethod')

})
















