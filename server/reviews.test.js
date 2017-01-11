const request = require('supertest-as-promised')
const {expect} = require('chai')
const db = require('APP/db')
const Review = require('APP/db/models/review')
const Product = require('APP/db/models/product')
const User = require('APP/db/models/user')

const app = require('./start')

describe('Reviews Route:', function () {
  // Clear the database before beginning each run
  before(function () {
    return db.sync({force: true})
  })
  // Empty the tables after each spec
  afterEach(function () {
    return Promise.all([
      Product.truncate({ cascade: true }),
      // User.truncate({ cascade: true })
    ])
  })


  describe('GET /products/:id/reviews', function () {
    // There isn't anything in the DB, should send an empty array
    it('responds with an array via JSON', function () {

      request(app)
      .get('/products/:id/reviews')
      .expect('Content-Type', /json/)
      .expect(200)
      .expect(function (res) {
        // res.body is the JSON return object
        expect(res.body).to.be.an.instanceOf(Array);
        expect(res.body).to.have.length(0);
      })
    })
     // Save reviews in the database using our model and then retrieve it
     // using the GET /products/:id/reviews route
    it('returns a review for a specific product', function () {

      let product = Product.build({
        name: 'Asus Motherboard',
        description: 'board',
        price: 599,
        stock: 1,
        category: 'Motherboard',
        photoUrl: 'http://images10.newegg.com/ProductImageCompressAll1280/13-132-927-V01.jpg?w=660&h=500&ex=2'
      })

      let user = User.build({
          name: 'd',
          email: 'beth@secrsets.org',
          password: '12345',
        })

      let review = Review.build({
        title: 'Great Product!',
        content: 'This is the content for the review',
        stars: 5,
        // userId: user.id,
        // productId: product.id,
      })

      return product.save().then(function () {
        return user.save().then(function () {
      	  return review.save().then(function () {
            request(app)
            .get('/products/:id/reviews')
            .expect(function (res) {
              expect(res.body).to.be.an.instanceOf(Array)
              expect(res.body[0].title).to.equal('Great Product!')
              expect(res.body[0].content).to.equal('This is the content for the review')
			        expect(res.body[0].stars).to.equal(5)
      		})
          })
      	})
      })
    })

    it('returns a review if there is one in the DB for a given product', function () {


     let product = Product.build({
        name: 'Asus Motherboard',
        description: 'board',
        price: 599,
        stock: 1,
        category: 'Motherboard',
        photoUrl: 'http://images10.newegg.com/ProductImageCompressAll1280/13-132-927-V01.jpg?w=660&h=500&ex=2'
      })

      let user1 = User.build({
          name: 'm',
          email: 'beth@secdarets.org',
          password: '12123345',
        })

      let user2 = User.build({
          name: 'j',
          email: 'dan@secrweqets.org',
          password: '56789',
        })

      let review1 = Review.build({
        title: 'Great Product!',
        content: 'This is the content for the review',
        stars: 5,
        // userId: user1.id,
        // productId: product.id,
      })

      let review2 = Review.build({
        title: 'Bad Product!',
        content: 'This is the content for the review',
        stars: 2,
        // userId: user2.id,
        // productId: product.id,
      })

      return product.save().then(function () {
        return user1.save().then(function () {
          return user2.save().then(function () {
      	    return review1.save().then(function () {
      	      return review2.save().then(function () {
                request(app)
                .get('/products/:id/reviews')
                .expect(function (res) {
                  expect(res.body).to.be.an.instanceOf(Array)
                  expect(res.body[0].title).to.equal('Great Product!')
                  expect(res.body[1].title).to.equal('Bad Product!')
              })
      		  })
          })
      	})
      })
    })
  })

  describe('POST /products/:id/reviews', function () {

    let coolProduct;

    beforeEach(function () {

      Product.create({
        name: 'Asus Motherboard',
        description: 'board',
        price: 599,
        stock: 1,
        category: 'Motherboard',
        photoUrl: 'http://images10.newegg.com/ProductImageCompressAll1280/13-132-927-V01.jpg?w=660&h=500&ex=2'
      })
      .then(createdProduct => {
        coolProduct = createdProduct;
      });


    it('creates a new review', function () {  
      request(app)
      .post('/products/' + coolProduct.id + '/reviews')
      .send({
        title: 'Great Product!',
        content: 'This is the content for the review',
        stars: 5,
        // userId: 1,
        // productId: 1,
      })
      .expect(200)
      .expect(function (res) {
        expect(res.body.message).to.equal('Created successfully');
        expect(res.body.review.id).to.not.be.an('undefined');
        expect(res.body.review.title).to.equal('Great Product!');
        expect(res.body.review.content).to.equal('This is the content for the review');
        expect(res.body.review.stars).to.equal(5);

      })

    })

    it('does not create a new review without content', function () {

      request(app)
      .post('/products/' + coolProduct.id + '/reviews')
      .send({
        title: 'This Product Review Should Not Be Allowed'
      })
      .expect(500);
    })

    it('saves the review to the DB', function () {

      request(app)
      .post('/products/' + coolProduct.id + '/reviews')
      .send({
        title: 'Great Product!',
        content: 'This is the content for the review',
        stars: 5,
        userId: 1,
        productId: 1,
      })
      .expect(200)
      .then(function () {
        return Review.findOne({
          where: { title: 'Great Product!' }
        })
      })
      .then(function (foundReview) {
        expect(foundReview).to.exist; // eslint-disable-line no-unused-expressions
        expect(foundReview.title).to.equal('Great Product!');
      })

    })

    it('sends back JSON of the actual created product, not just the POSTed data', function () {

      request(app)
      .post('/products/' + coolProduct.id + '/reviews')
      .send({
        title: 'Great Product!',
        content: 'This is the content for the review',
        stars: 5,
        userId: 1,
        productId: 1,
        extraneous: 'Sequelize will quietly ignore this non-schema property'
      })
      .expect(200)
      .expect(function (res) {
        expect(res.body.review.extraneous).to.be.an('undefined');
        expect(res.body.review.createdAt).to.exist; // eslint-disable-line no-unused-expressions
      })

    })

  })

})
})
})