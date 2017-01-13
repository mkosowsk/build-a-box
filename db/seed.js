const db = require('APP/db')

const seedUsers = () => db.Promise.map(
	[{
		id:1,	
		name: "Jonathan Guy",
		email: "jguy@gmail.com",
		billAddress: "5 Hanover Square, New York, NY",
		shipAddress: "5 Hanover Square, New York, NY",
		isAdmin: true,
		password: 'monkey'
	}, {
		id:2,
		name: "Buddy Pal",
		email: "palbud@gmail.com",
		billAddress: "123 Tree Road, Dundersphere, NH",
		shipAddress: "6 City Place, Industritown, NJ",
		isAdmin: false,
		password: 'iambuddy'
	}], user => db.model('users').create(user))

const seedReviews = () => db.Promise.map(
	[{
		id:1,	
		title: "I love the Intel Megabuster",
		content: "I like this product very much.",
		stars: 5,
		user_id:1,
		product_id:1
	}, {
		id:2,
		title: "Nvidia 2000 is BAD",
		content: "I did not like this product at all.",
		stars: 1,
		user_id:1,
		product_id:2
	}, {
		id:3,
		title: "A review of Intel Megabuster",
		content: "This is a bad cpu.",
		stars: 1,
		product_id:1,
		user_id:2
	}, {
		id:4,
		title: "A review of Nvidia 2000",
		content: "This is a good cpu.",
		stars: 4,
		user_id:2,
		product_id:2
	}], review => db.model('reviews').create(review))

const seedProducts = () => db.Promise.map(
	[{
		id:1,
		name: "Intel Megabuster",
		photoUrl: "http://www.fillmurray.com/400/400",
		description: "This is a good cpu",
		price: "300",
		category: "CPU",
		stock: 12
	}, {
		id:2,
		name: "Nvidia 2000",
		photoUrl: "http://www.fillmurray.com/400/400",
		description: "This is a good gpu",
		price: "200",
		category: "GPU",
		stock: 10
	}], product => db.model('products').create(product))

db.didSync
	.then(() => db.sync({
		force: true
	}))
	.then(seedUsers)
	.then((users) => console.log(`Seeded ${users.length} users OK`))
	.then(seedProducts)
	.then((products) => console.log(`Seeded ${products.length} products OK`))
	.then(seedReviews)
	.then((reviews) => console.log(`Seeded ${reviews.length} reviews OK`))
	.catch(error => console.error(error))
	.finally(() => db.close())



