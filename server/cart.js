const db = require('APP/db')
const Product = db.model('products')
const Guest = db.model('guests')

 
  
module.exports = require('express').Router()
  .get('/', (req, res, next) => 
    Product.findAll()
    .then(products => res.json(products))
    .catch(next))

  .post('/', function(req, res, next) { 
    var product = req.body;
    // if(req.user){
    
    req.session.product = product;
    //console.log("HEY",  req.headers.cookie, req.session)
      if(req.session){
        
        var guest = {
          guestId: 'w'

        };

       Guest.create(guest).then(function(guest){
          console.log("IM AN GUEST", guest);
          console.log("IM A PRODUCT", req.body);

          Product.findById(req.body.product.id).then(function(product){
            console.log("IN PRODUCT", product);
            return guest.addProduct(product);

          })
         

        }).catch(next);
    }
  })
    
  
  // router.get('/:id', (req, res, next) => 
  //   Product.findById(req.params.id)
  //   .then(foundProduct => {
  //     if (!foundProduct) res.sendStatus(404);
  //     else res.json(foundProduct)
  //   })
  //   .catch(next))
  
  // router.get('/:category', (req, res, next) => 
  //   Product.findByAll({
  //     where: {
  //       category: req.params.category,
  //     }
  //   })
  //   .then(products => {
  //     if (!products) res.sendStatus(404);
  //     else res.json(products)
  //   })
  //   .catch(next))
  
  // router.put('/:id', (req, res, next) => {
  //   console.log("any string hittin the route")
  //   Product.update(req.body, {
  //     where: {id: req.params.id},
  //     returning: true
  //   })
  //   .then(function (results) {
  //     var updated = results[1][0]
  //     // console.log("hello", updated)
  //     res.json({
  //       message: 'Updated successfully',
  //       product: updated
  //     })
  //   })
  //   .catch(function(err){
  //     console.log(err)
  //   })
  //})

