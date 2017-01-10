//todo add looking at reviews for a given user

const request = require('supertest-as-promised')
const {expect} = require('chai')
const db = require('APP/db')
const Review = require('APP/db/models/review')
const Product = require('APP/db/models/product')
const User = require('APP/db/models/user')

const app = require('./start')

describe('Reviews Route:', function () {

  /**
   * First we clear the database before beginning each run
   */
  before(function () {
    return db.sync({force: true});
  });

  /**
   * Also, we empty the tables after each spec
   */
  afterEach(function () {
    return Promise.all([
      Product.truncate({ cascade: true }),
      // User.truncate({ cascade: true })
    ]);
  });

  describe('GET /products/:id/reviews', function () {
    /**
     * Problem 1
     * We'll run a GET request to /products/:id/reviews
     *
     * 1.  It should return JSON (i.e., use res.json)
     * 2.  Because there isn't anything in the DB, it should be an empty array
     *
     * **Extra Credit**: Consider using app.param to automatically load
     * in the product whenever a param :id is detected
     */
    it('responds with an array via JSON', function () {

      request(app)
      .get('/products/:id/reviews')
      .expect('Content-Type', /json/)
      .expect(200)
      .expect(function (res) {
        // res.body is the JSON return object
        expect(res.body).to.be.an.instanceOf(Array);
        expect(res.body).to.have.length(0);
      });

    });

    /**
     * Problem 2
     * Save an products in the database using our model and then retrieve it
     * using the GET /products/:id/reviews route
     *
     */
    it('returns a review for a specific product', function () {

      var product = Product.build({
        title: 'Asus motherboard',
        description: 'board',
        price: 5.99,
        quantity: 1,
        category: 'motherboard',
        photoUrl: 'http://images10.newegg.com/ProductImageCompressAll1280/13-132-927-V01.jpg?w=660&h=500&ex=2'
      })

      var user = User.build({
          email: 'beth@secrets.org',
          password: '12345',
        })

      var review = Review.build({
        title: 'Great Product!',
        content: 'This is the content for the review',
        rating: 5,
        userId: user.id,
        productId: product.id,
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
			        expect(res.body[0].rating).to.equal(5)
      		})
          })
      	})
      })
    })

    /**
     * Problem 3
     * Save a second review in the database using our model, then retrieve it
     * using the GET /products/:id/reviews route
     *
     */
    it('returns a review if there is one in the DB for a given product', function () {


     var product = Product.build({
        title: 'Asus motherboard',
        description: 'board',
        price: 5.99,
        quantity: 1,
        category: 'motherboard',
        photoUrl: 'http://images10.newegg.com/ProductImageCompressAll1280/13-132-927-V01.jpg?w=660&h=500&ex=2'
      })

      var user1 = User.build({
          email: 'beth@secrets.org',
          password: '12345',
        })

      var user2 = User.build({
          email: 'dan@secrets.org',
          password: '56789',
        })

      var review1 = Review.build({
        title: 'Great Product!',
        content: 'This is the content for the review',
        rating: 5,
        userId: user1.id,
        productId: product.id,
      })

      var review2 = Review.build({
        title: 'Bad Product!',
        content: 'This is the content for the review',
        rating: 2,
        userId: user2.id,
        productId: product.id,
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

  // re add the following tests once we have models built out

  /**
   * Series of tests to test creation of new reviews using a POST
   * request to /products/:id/reviews
   */

  describe('POST /products/:id/reviews', function () {

    var coolProduct;

    beforeEach(function () {

      Product.create({
        title: 'Asus motherboard',
        description: 'board',
        price: 5.99,
        quantity: 1,
        category: 'motherboard',
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
        rating: 5,
        userId: 1,
        productId: 1,
      })
      .expect(200)
      .expect(function (res) {
        expect(res.body.message).to.equal('Created successfully');
        expect(res.body.review.id).to.not.be.an('undefined');
        expect(res.body.review.title).to.equal('Great Product!');
        expect(res.body.review.content).to.equal('This is the content for the review');
        expect(res.body.review.rating).to.equal(5);

      });

    });

    // This one should fail with a 500 because we don't set the review.content
    it('does not create a new review without content', function () {

      request(app)
      .post('/products/' + coolProduct.id + '/reviews')
      .send({
        title: 'This Product Review Should Not Be Allowed'
      })
      .expect(500);

    });

    // Check if the review were actually saved to the database
    it('saves the review to the DB', function () {

      request(app)
      .post('/products/' + coolProduct.id + '/reviews')
      .send({
        title: 'Great Product!',
        content: 'This is the content for the review',
        rating: 5,
        userId: 1,
        productId: 1,
      })
      .expect(200)
      .then(function () {
        return Review.findOne({
          where: { title: 'Great Product!' }
        });
      })
      .then(function (foundReview) {
        expect(foundReview).to.exist; // eslint-disable-line no-unused-expressions
        expect(foundReview.title).to.equal('Great Product!');
      });

    });

    // Do not assume async operations (like db writes) will work; always check
    it('sends back JSON of the actual created product, not just the POSTed data', function () {

      request(app)
      .post('/products/' + coolProduct.id + '/reviews')
      .send({
        title: 'Great Product!',
        content: 'This is the content for the review',
        rating: 5,
        userId: 1,
        productId: 1,
        extraneous: 'Sequelize will quietly ignore this non-schema property'
      })
      .expect(200)
      .expect(function (res) {
        expect(res.body.review.extraneous).to.be.an('undefined');
        expect(res.body.review.createdAt).to.exist; // eslint-disable-line no-unused-expressions
      });

    });

  });

  /**
   * Series of specs to test updating of products using a PUT
   * request to /product/:id
   */
  // describe('PUT /product/:id', function () {

  //   var product;

  //   beforeEach(function () {

  //     Product.create({
  //       title: 'Asus motherboard',
  //       description: 'board',
  //       price: 5.99,
  //       quantity: 1,
  //       category: 'motherboard',
  //       photoUrl: 'http://images10.newegg.com/ProductImageCompressAll1280/13-132-927-V01.jpg?w=660&h=500&ex=2'
  //     })
  //     .then(createdProduct => {
  //       product = createdProduct;
  //     });
  //   });

  //   /**
  //    * Test the updating of an product
  //    * Here we don't get back just the prodcut, we get back a Object
  //    * of this type, which you construct manually:
  //    *
  //    *
  //    * }
  //    */
  //   it('updates a product', function () {

  //     request(app)
  //     .put('/products/' + product.id)
  //     .send({
  //       title: 'Asus mobo2'
  //     })
  //     .expect(200)
  //     .expect(function (res) {
  //       expect(res.body.message).to.equal('Updated successfully');
  //       expect(res.body.product.id).to.not.be.an('undefined');
  //       expect(res.body.product.title).to.equal('Asus mobo2');
  //       expect(res.body.product.photoUrl).to.equal('http://images10.newegg.com/ProductImageCompressAll1280/13-132-927-V01.jpg?w=660&h=500&ex=2');
  //     });

  //   });

  //   it('saves updates to the DB', function () {

  //     request(app)
  //     .put('/products/' + product.id)
  //     .send({
  //       title: 'Asus mobo2'
  //     })
  //     .then(function () {
  //       return Product.findById(product.id);
  //     })
  //     .then(function (foundProduct) {
  //       expect(foundProduct).to.exist; // eslint-disable-line no-unused-expressions
  //       expect(foundProduct.title).to.equal('Asus mobo2');
  //     });

  //   });

  //   it('gets 500 for invalid update', function () {

  //     request(app)
  //     .put('/products/' + product.id)
  //     .send({ title: '' })
  //     .expect(500);

    });

  });

});