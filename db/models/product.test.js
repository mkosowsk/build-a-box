'use strict'

const db = require('APP/db')
const Product = require('./product')
const {expect} = require('chai')

describe('Product', () => {
  before('wait for the db', () => db.didSync)

  var photoUrl = 'fillmurray.com/400/400'
  var fulltext = "This is an Asus product";
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

  afterEach(function () {
    return Product.truncate({ cascade: true });
  });


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



    })
  
})