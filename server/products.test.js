// todo add search
// find by price

const request = require('supertest-as-promised')
const {expect} = require('chai')
const db = require('APP/db')
const Product = require('APP/db/models/product')
const app = require('./start')

describe('Products Route:', function () {
  // Clear the database before beginning each run
  // before(function () {
  //   return db.sync({force: true});
  // })
  // // Empty the tables after each spec
  // afterEach(function () {
  //   return Promise.all([
  //     Product.truncate({ cascade: true }),
  //     // User.truncate({ cascade: true })
  //   ])
  // })

  describe('GET /products', function () {
    // There isn't anything in the DB, should send an empty array
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
     // Save products in the database using our model and then retrieve it
     // using the GET /products route

    it('returns an product if there is one in the DB', function () {

      let product = Product.build({
        name: 'Asus Motherboard',
        description: 'board',
        price: 599,
        stock: 1,
        category: 'Motherboard',
        photoUrl: 'http://images10.newegg.com/ProductImageCompressAll1280/13-132-927-V01.jpg?w=660&h=500&ex=2'
      });

      return product.save().then(function () {

        request(app)
        .get('/products')
        .expect(200)
        .expect(function (res) {
          expect(res.body).to.be.an.instanceOf(Array);
          expect(res.body[0].name).to.equal('Asus Motherboard');
          expect(res.body[0].description).to.equal('board');
          expect(res.body[0].price).to.equal(599);
          expect(res.body[0].stock).to.equal(1);
          expect(res.body[0].category).to.equal('Motherboard');
          expect(res.body[0].photoUrl).to.equal('http://images10.newegg.com/ProductImageCompressAll1280/13-132-927-V01.jpg?w=660&h=500&ex=2');
        });

      });

    });

    it('returns another product if there is one in the DB', function () {

      var product1 = Product.build({
              name: 'Asus Motherboard',
              description: 'board',
              price: 599,
              stock: 1,
              category: 'Motherboard',
              photoUrl: 'http://images10.newegg.com/ProductImageCompressAll1280/13-132-927-V01.jpg?w=660&h=500&ex=2'
            });

      var product2 = Product.build({
              name: 'Amd Motherboard',
              description: 'board',
              price: 799,
              stock: 2,
              category: 'Motherboard',
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
          expect(res.body[0].name).to.equal('Asus Motherboard');
          expect(res.body[1].name).to.equal('Amd Motherboard');
        })

      })

    })

  })

  describe('GET /products/:id', function () {

    let coolProduct;

    beforeEach(function () {

      let creatingProducts = [{
        name: 'Asus Motherboard',
        description: 'board',
        price: 599,
        stock: 1,
        category: 'Motherboard',
        photoUrl: 'http://images10.newegg.com/ProductImageCompressAll1280/13-132-927-V01.jpg?w=660&h=500&ex=2'
      }, {
        name: 'Amd Motherboard',
        description: 'board',
        price: 799,
        stock: 2,
        category: 'Motherboard',
        photoUrl: 'http://images10.newegg.com/NeweggImage/ProductImageCompressAll1280/13-130-970-V01.jpg?w=660&h=500&ex=2'
      }]
      .map(data => Product.create(data));

      return Promise.all(creatingProducts)
      .then(createdProducts => {
        coolProduct = createdProducts[1];
      })

    })

    it('returns the JSON of the product based on the id', function () {

      request(app)
      .get('/products/' + coolProduct.id)
      .expect(200)
      .expect(function (res) {
        if (typeof res.body === 'string') {
          res.body = JSON.parse(res.body);
        }
        expect(res.body.name).to.equal('Amd Motherboard');
      })

    })

    it('returns a 404 error if the ID is not correct', function () {

      request(app)
      .get('/products/76142896')
      .expect(404);

    })

  })

  describe('GET /products/:category', function () {

    let coolProduct;

    beforeEach(function () {

      var creatingProducts = [{
        name: 'Asus Motherboard',
        description: 'board',
        price: 599,
        stock: 1,
        category: 'Motherboard',
        photoUrl: 'http://images10.newegg.com/ProductImageCompressAll1280/13-132-927-V01.jpg?w=660&h=500&ex=2'
      }, {
        name: 'Amd Motherboard',
        description: 'board',
        price: 799,
        stock: 2,
        category: 'Motherboard',
        photoUrl: 'http://images10.newegg.com/NeweggImage/ProductImageCompressAll1280/13-130-970-V01.jpg?w=660&h=500&ex=2'
      }, {
        name: 'ATI GPU',
        description: 'graphics',
        price: 150,
        stock: 1,
        category: 'GPU',
        photoUrl: 'http://images10.newegg.com/productimage/A0ZX_1_20150215234604920.jpg?ex=2'
      }]
      .map(data => Product.create(data));

      return Promise.all(creatingProducts)
      .then(createdProducts => {
        coolProduct = createdProducts[1];
      })

    })

    it('returns the JSON of the product based on the category', function () {

      request(app)
      .get('/products/Motherboard')
      .expect(200)
      .expect(function (res) {
        if (typeof res.body === 'string') {
          res.body = JSON.parse(res.body);
        }
        expect(res.body[0].name).to.equal('Asus Motherboard');
        expect(res.body[1].name).to.equal('Amd Motherboard');
      })

    })


    it('returns a 404 error if the ID is not correct', function () {

      request(app)
      .get('/products/76142896')
      .expect(404)

    })

  })

  describe('POST /products', function () {

    it('creates a new product', function () {

      request(app)
      .post('/products')
      .send({
        name: 'Asus Motherboard',
        description: 'board',
        price: 599,
        stock: 1,
        category: 'Motherboard',
        photoUrl: 'http://images10.newegg.com/ProductImageCompressAll1280/13-132-927-V01.jpg?w=660&h=500&ex=2'
      })
      .expect(200)
      .expect(function (res) {
        expect(res.body.message).to.equal('Created successfully');
        expect(res.body.product.id).to.not.be.an('undefined');
        expect(res.body.product.name).to.equal('Asus Motherboard');
      });

    });

    it('does not create a new product without content', function () {

      request(app)
      .post('/products')
      .send({
        name: 'This product Should Not Be Allowed'
      })
      .expect(500);

    });

    it('saves the product to the DB', function () {
      var test = request(app)
      .post('/products')
      .send({
        name: 'Asus Motherboard',
        description: 'board',
        price: 599,
        stock: 1,
        category: 'Motherboard',
        photoUrl: 'http://images10.newegg.comctImageCompressAll1280/13-132-927-V01=660&h=500&ex=2'
      })
      // console.log(test.status)
      request(app)
      .post('/products')
      .send({
        name: 'Asus Motherboard',
        description: 'board',
        price: 599,
        stock: 1,
        category: 'Motherboard',
        photoUrl: 'http://images10.newegg.comctImageCompressAll1280/13-132-927-V01=660&h=500&ex=2'
      })
      // .expect(200)
      .then(function () {
        return Product.findOne({
          where: { name: 'Asus Motherboard' }
        });
      })
      .then(function (foundProducts) {
        expect(foundProducts).to.exist; // eslint-disable-line no-unused-expressions
        expect(foundProducts.name).to.equal('Asus Motherboard');
      })

    })

    // Do not assume async operations (like db writes) will work; always check
    it('sends back JSON of the actual created product, not just the POSTed data', function () {

      request(app)
      .post('/products')
      .send({
        name: 'Asus Motherboard',
        description: 'board',
        price: 599,
        stock: 1,
        category: 'Motherboard',
        photoUrl: 'http://images10.newegg.com/ProductImageCompressAll1280/13-132-927-V01.jpg?w=660&h=500&ex=2',
        extraneous: 'Sequelize will quietly ignore this non-schema property'
      })
      .expect(200)
      .expect(function (res) {
        expect(res.body.product.extraneous).to.be.an('undefined');
        expect(res.body.product.createdAt).to.exist; // eslint-disable-line no-unused-expressions
      })

    })

  })

  describe('PUT /products/:id', function () {

    let product;

    beforeEach(function () {

      return Product.create({
        name: 'Asus Motherboard',
        description: 'board',
        price: 599,
        stock: 1,
        category: 'Motherboard',
        photoUrl: 'http://images10.newegg.com/ProductImageCompressAll1280/13-132-927-V01.jpg?w=660&h=500&ex=2'
      })
      .then(function (createdProduct) {
        product = createdProduct;
      })

    })

    it('updates a product', function () {
      console.log(product.id)
      request(app)
      .put('/products/' + product.id)
      .send({
        name: 'Asus mobo2'
      })
      .expect(200)
      .expect(function (res) {
        expect(res.body.message).to.equal('Updated successfully');
        expect(res.body.product.id).to.not.be.an('undefined');
        expect(res.body.product.name).to.equal('Asus mobo2');
        expect(res.body.product.photoUrl).to.equal('http://images10.newegg.com/ProductImageCompressAll1280/13-132-927-V01.jpg?w=660&h=500&ex=2');
      })

    })

    it('saves updates to the DB', function () {

      request(app)
      .put('/products/' + product.id)
      .send({
        name: 'Asus mobo2'
      })
      .then(function () {
        return Product.findById(product.id);
      })
      .then(function (foundProduct) {
        expect(foundProduct).to.exist; // eslint-disable-line no-unused-expressions
        expect(foundProduct.name).to.equal('Asus mobo2');
      })

    })

    it('gets 500 for invalid update', function () {

      request(app)
      .put('/products/' + product.id)
      .send({ name: '' })
      .expect(500);

    })

  })

})