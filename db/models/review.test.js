'use strict'

const db = require('APP/db')
const Product = require('./product')
const Review = require('./review')
const {expect} = require('chai')



describe('Review', function(){
	before('wait for the db', () => db.didSync)

	var review;

  beforeEach(function(){
    review = Review.build({
      comment: 'This is a good product',
      stars: 5
    });
  });

  // afterEach(function () {
  //   return Product.truncate({ cascade: true });
  // });

  describe('Validation of fields', () => {

    it('Has all fields populated', function(){
      return review.save().then(function(review){
          expect(review.comment).to.be.a('string');
          assert.isNumber(review.price, 'the price');
         
      })
    })

    it('throws error if stars above 5', function() {
      review.stars = 10;

      return product.validate()
        .then((result) => {
          expect(result).to.be.an.instanceOf(Error);
          expect(result.message).to.contain('Validation error');
        })
    });
    
    it('throws error if stars below 0', function() {
      review.stars = -2;

      return product.validate()
        .then((result) => {
          expect(result).to.be.an.instanceOf(Error);
          expect(result.message).to.contain('Validation error');
        })
    })
  })
 
  describe('associations', () => {
    

    // Testing for Review.belongsTo(Product)

    it('Checks that a review belongs to a product', function(){

      const pA = Product.create({ Text: 'GOOD', Stars: 3 })
      const pB = Product.create({ Text: 'Terrible', Stars: 1 })
       
       return Promise.all([reviewA, reviewB])
      .then(function([reviewA, reviewB]) {

          var p1 = product.setReviews(reviewA);
          var p2 = product.setReviews(reviewB);

          return Promise.all([p1,p2]);
        })
      .then(() => {
          return Product.findOne({
            where: {name: 'Asus780'},
            include: { model: Review, as: 'Reviews'}
          });
        })
      .then((productWithReviews) => {
          expect(productWithReviews.Reviews).to.exist; 
          expect(productWithReviews.Reviews[0].Text).to.equal('GOOD');
      })

    })

    
  })
})