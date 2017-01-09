const request = require('supertest-as-promised')
const {expect} = require('chai')
const db = require('APP/db')
const Product = require('APP/db/models/product')
const app = require('./start')

describe('/api/products', () => {
  describe('see nothing if no products are given', () => {
    it('GET lists all products', () =>
      request(app)
        .get(`/api/products`)
        .expect(401)
    )    

    it('POST creates a user', () =>
      request(app)
        .post('/api/users')
        .send({
          email: 'beth@secrets.org',
          password: '12345'
        })
        .expect(201)
    )

    it('POST redirects to the user it just made', () =>
      request(app)
        .post('/api/users')
        .send({
          email: 'eve@interloper.com',
          password: '23456',
        })
        .redirects(1)
        .then(res => expect(res.body).to.contain({
          email: 'eve@interloper.com'
        }))        
    )
  })
})