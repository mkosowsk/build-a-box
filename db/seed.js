const db = require('APP/db')

const seedUsers = () => db.Promise.map(
	[{
		name: 'so many',
		email: 'god@example.com',
		password: '1234'
	}, {
		name: 'Barack Obama',
		email: 'barack@example.gov',
		password: '1234'
	}, {
		name: "Jonathan Guy",
		email: "jguy@gmail.com",
		billAddress: "5 Hanover Square, New York, NY",
		shipAddress: "5 Hanover Square, New York, NY",
		isAdmin: "true"
	}, {
		name: "Buddy Pal",
		email: "palbud@gmail.com",
		billAddress: "123 Tree Road, Dundersphere, NH",
		shipAddress: "6 City Place, Industritown, NJ",
		isAdmin: "false"
	}], user => db.model('users').create(user))

const seedReviews = () => db.Promise.map(
	[{
		title: "I love the Intel Megabuster",
		content: "I like this product very much.",
		stars: 5
	}, {
		title: "Nvidia 2000 is BAD",
		content: "I did not like this product at all.",
		stars: 1
	}, {
		title: "A review of Intel Megabuster",
		content: "This is a bad cpu.",
		stars: 1
	}, {
		title: "A review of Nvidia 2000",
		content: "This is a good cpu.",
		stars: 4,
	}], review => db.model('reviews').create(review))

const seedProducts = () => db.Promise.map(
	[{
		name: "Intel Megabuster",
		photoUrl: "fillmurray.com/400/400",
		description: "This is a good cpu",
		price: "300",
		category: "CPU",
		stock: 12
	}, {
		name: "Nvidia 2000",
		photoUrl: "fillmurray.com/400/400",
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
	.then(seedReviews)
	.then((reviews) => console.log(`Seeded ${reviews.length} reviews OK`))
	.then(seedProducts)
	.then((products) => console.log(`Seeded ${products.length} products OK`))
	.catch(error => console.error(error))
	.finally(() => db.close())



