'use strict'

const db = require('APP/db')
const User = require('./user')
const {
  expect
} = require('chai')
const Review = require('./review');

describe('User', () => {
  before('wait for the db', () => db.didSync)

  var user;

  describe('authenticate(plaintext: String) ~> Boolean', () => {
    it('resolves true if the password matches', () =>
      User.create({
        name: 'Jeff',
        email: 'email@gmail.com',
        isAdmin: true,
        password: 'ok'
      })
      .then(user => user.authenticate('ok'))
      .then(result => expect(result).to.be.true))

    it("resolves false if the password doesn't match", () =>
      User.create({
        name: 'Jeff',
        email: 'lame@gmail.com',
        isAdmin: true,
        password: 'ok'
      })
      .then(user => user.authenticate('not ok'))
      .then(result => expect(result).to.be.false))
  })

  describe('Associations', () => {
    it('Make sure user can have many reviews', () => {

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

          User.create({
            name: 'Jeff',
            email: 'cool@gmail.com',
            isAdmin: true,
            password: 'ok'
          }).then(user1 => {
            user = user1;
            return user.setReviews([reviewA, reviewB]);
          }).then(() => {
            user.getReviews()
          }).then(reviews => {
            expect(reviews).to.exist;
            expect(reviews[0].title).to.equal('GOOD');
          })

        })

    })
  })
})