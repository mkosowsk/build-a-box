//todo add search
//find by category/price

const request = require('supertest-as-promised')
const {expect} = require('chai')
const db = require('APP/db')
// const Product = require('APP/db/models/product')
const app = require('./start')

describe('Products Route:', function () {

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

  describe('GET /products', function () {
    /**
     * Problem 1
     * We'll run a GET request to /products
     *
     * 1.  It should return JSON (i.e., use res.json)
     * 2.  Because there isn't anything in the DB, it should be an empty array
     *
     * **Extra Credit**: Consider using app.param to automatically load
     * in the product whenever a param :id is detected
     */
    it('responds with an array via JSON', function () {

      request(app)
      .get('/products')
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
     * using the GET /products route
     *
     */
    it('returns an product if there is one in the DB', function () {

      var product = Product.build({
        title: 'Asus motherboard',
        description: 'board',
        price: 5.99,
        quantity: 1,
        category: 'motherboard',
        photoUrl: 'http://images10.newegg.com/ProductImageCompressAll1280/13-132-927-V01.jpg?w=660&h=500&ex=2'
      });

      return product.save().then(function () {

        request(app)
        .get('/products')
        .expect(200)
        .expect(function (res) {
          expect(res.body).to.be.an.instanceOf(Array);
          expect(res.body[0].title).to.equal('Asus motherboard');
          expect(res.body[0].description).to.equal('board');
          expect(res.body[0].price).to.equal(5.99);
          expect(res.body[0].quantity).to.equal(1);
          expect(res.body[0].category).to.equal('motherboard');
          expect(res.body[0].photoUrl).to.equal('http://images10.newegg.com/ProductImageCompressAll1280/13-132-927-V01.jpg?w=660&h=500&ex=2');
        });

      });

    });

    /**
     * Problem 3
     * Save a second products in the database using our model, then retrieve it
     * using the GET /products route
     *
     */
    it('returns another product if there is one in the DB', function () {

      var product1 = Product.build({
              title: 'Asus motherboard',
              description: 'board',
              price: 5.99,
              quantity: 1,
              category: 'motherboard',
              photoUrl: 'http://images10.newegg.com/ProductImageCompressAll1280/13-132-927-V01.jpg?w=660&h=500&ex=2'
            });

      var product2 = Product.build({
              title: 'Amd motherboard',
              description: 'board',
              price: 7.99,
              quantity: 2,
              category: 'motherboard',
              photoUrl: 'http://images10.newegg.com/NeweggImage/ProductImageCompressAll1280/13-130-970-V01.jpg?w=660&h=500&ex=2'
            });

      return product1.save()
      .then(function () { return product2.save() })
      .then(function () {

        request(app)
        .get('/products')
        .expect(200)
        .expect(function (res) {
          expect(res.body).to.be.an.instanceOf(Array);
          expect(res.body[0].title).to.equal('Asus motherboard');
          expect(res.body[1].title).to.equal('Amd motherboard');
        });

      });

    });

  });

  /**
   * Search for products by ID
   */
  describe('GET /products/:id', function () {

    var coolProduct;

    beforeEach(function () {

      var creatingProducts = [{
        title: 'Asus motherboard',
        description: 'board',
        price: 5.99,
        quantity: 1,
        category: 'motherboard',
        photoUrl: 'http://images10.newegg.com/ProductImageCompressAll1280/13-132-927-V01.jpg?w=660&h=500&ex=2'
      }, {
        title: 'Amd motherboard',
        description: 'board',
        price: 7.99,
        quantity: 2,
        category: 'motherboard',
        photoUrl: 'http://images10.newegg.com/NeweggImage/ProductImageCompressAll1280/13-130-970-V01.jpg?w=660&h=500&ex=2'
      }]
      .map(data => Product.create(data));

      return Promise.all(creatingProducts)
      .then(createdProducts => {
        coolProduct = createdProducts[1];
      });

    });

    /**
     * This is a proper GET /products/ID request
     * where we search by the ID of the product created above
     */
    it('returns the JSON of the product based on the id', function () {

      request(app)
      .get('/products/' + coolProduct.id)
      .expect(200)
      .expect(function (res) {
        if (typeof res.body === 'string') {
          res.body = JSON.parse(res.body);
        }
        expect(res.body.title).to.equal('Amd motherboard');
      });

    });

    /**
     * Here we pass in a bad ID to the URL, we should get a 404 error
     */
    it('returns a 404 error if the ID is not correct', function () {

      request(app)
      .get('/products/76142896')
      .expect(404);

    });

  });

  describe('GET /products/:category', function () {

    var coolProduct;

    beforeEach(function () {

      var creatingProducts = [{
        title: 'Asus motherboard',
        description: 'board',
        price: 5.99,
        quantity: 1,
        category: 'motherboard',
        photoUrl: 'http://images10.newegg.com/ProductImageCompressAll1280/13-132-927-V01.jpg?w=660&h=500&ex=2'
      }, {
        title: 'Amd motherboard',
        description: 'board',
        price: 7.99,
        quantity: 2,
        category: 'motherboard',
        photoUrl: 'http://images10.newegg.com/NeweggImage/ProductImageCompressAll1280/13-130-970-V01.jpg?w=660&h=500&ex=2'
      }, {
        title: 'ATI graphics card',
        description: 'graphics',
        price: 150.00,
        quantity: 1,
        category: 'graphics card',
        photoUrl: 'http://images10.newegg.com/productimage/A0ZX_1_20150215234604920.jpg?ex=2'
      }]
      .map(data => Product.create(data));

      return Promise.all(creatingProducts)
      .then(createdProducts => {
        coolProduct = createdProducts[1];
      });

    });

    /**
     * This is a proper GET /products/ID request
     * where we search by the ID of the product created above
     */
    it('returns the JSON of the product based on the category', function () {

      request(app)
      .get('/products/motherboard')
      .expect(200)
      .expect(function (res) {
        if (typeof res.body === 'string') {
          res.body = JSON.parse(res.body);
        }
        expect(res.body[0].title).to.equal('Asus motherboard');
        expect(res.body[1].title).to.equal('Amd motherboard');
      });

    });

    /**
     * Here we pass in a bad ID to the URL, we should get a 404 error
     */
    it('returns a 404 error if the ID is not correct', function () {

      request(app)
      .get('/products/76142896')
      .expect(404);

    });

  });
  /**
   * Series of tests to test creation of new products using a POST
   * request to /products
   */
  describe('POST /products', function () {

   
    it('creates a new product', function () {

      request(app)
      .post('/products')
      .send({
        title: 'Asus motherboard',
        description: 'board',
        price: 5.99,
        quantity: 1,
        category: 'motherboard',
        photoUrl: 'http://images10.newegg.com/ProductImageCompressAll1280/13-132-927-V01.jpg?w=660&h=500&ex=2'
      })
      .expect(200)
      .expect(function (res) {
        expect(res.body.message).to.equal('Created successfully');
        expect(res.body.product.id).to.not.be.an('undefined');
        expect(res.body.product.title).to.equal('Asus motherboard');
      });

    });

    // This one should fail with a 500 because we don't set the product.description
    it('does not create a new product without content', function () {

      request(app)
      .post('/products')
      .send({
        title: 'This product Should Not Be Allowed'
      })
      .expect(500);

    });

    // Check if the product were actually saved to the database
    it('saves the product to the DB', function () {

      request(app)
      .post('/products')
      .send({
        title: 'Asus motherboard',
        description: 'board',
        price: 5.99,
        quantity: 1,
        category: 'motherboard',
        photoUrl: 'http://images10.newegg.com/ProductImageCompressAll1280/13-132-927-V01.jpg?w=660&h=500&ex=2'
      })
      .expect(200)
      .then(function () {
        return Product.findOne({
          where: { title: 'Asus motherboard' }
        });
      })
      .then(function (foundProducts) {
        expect(foundProducts).to.exist; // eslint-disable-line no-unused-expressions
        expect(foundProducts.title).to.equal('Asus motherboard');
      });

    });

    // Do not assume async operations (like db writes) will work; always check
    it('sends back JSON of the actual created product, not just the POSTed data', function () {

      request(app)
      .post('/products')
      .send({
        title: 'Asus motherboard',
        description: 'board',
        price: 5.99,
        quantity: 1,
        category: 'motherboard',
        photoUrl: 'http://images10.newegg.com/ProductImageCompressAll1280/13-132-927-V01.jpg?w=660&h=500&ex=2',
        extraneous: 'Sequelize will quietly ignore this non-schema property'
      })
      .expect(200)
      .expect(function (res) {
        expect(res.body.product.extraneous).to.be.an('undefined');
        expect(res.body.product.createdAt).to.exist; // eslint-disable-line no-unused-expressions
      });

    });

  });

  /**
   * Series of specs to test updating of products using a PUT
   * request to /product/:id
   */
  describe('PUT /products/:id', function () {

    var product;

    beforeEach(function () {

      return Product.create({
        title: 'Asus motherboard',
        description: 'board',
        price: 5.99,
        quantity: 1,
        category: 'motherboard',
        photoUrl: 'http://images10.newegg.com/ProductImageCompressAll1280/13-132-927-V01.jpg?w=660&h=500&ex=2'
      })
      .then(function (createdProduct) {
        product = createdProduct;
      });

    });

    /**
     * Test the updating of an product
     * Here we don't get back just the prodcut, we get back a Object
     * of this type, which you construct manually:
     *
     *
     * }
     */
    it('updates a product', function () {

      request(app)
      .put('/products/' + product.id)
      .send({
        title: 'Asus mobo2'
      })
      .expect(200)
      .expect(function (res) {
        expect(res.body.message).to.equal('Updated successfully');
        expect(res.body.product.id).to.not.be.an('undefined');
        expect(res.body.product.title).to.equal('Asus mobo2');
        expect(res.body.product.photoUrl).to.equal('http://images10.newegg.com/ProductImageCompressAll1280/13-132-927-V01.jpg?w=660&h=500&ex=2');
      });

    });

    it('saves updates to the DB', function () {

      request(app)
      .put('/products/' + product.id)
      .send({
        title: 'Asus mobo2'
      })
      .then(function () {
        return Product.findById(product.id);
      })
      .then(function (foundProduct) {
        expect(foundProduct).to.exist; // eslint-disable-line no-unused-expressions
        expect(foundProduct.title).to.equal('Asus mobo2');
      });

    });

    it('gets 500 for invalid update', function () {

      request(app)
      .put('/products/' + product.id)
      .send({ title: '' })
      .expect(500);

    });

  });

});