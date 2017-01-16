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
	}, {
		id:3,
		name: "Emma Watson",
		email: "emmawatson@gmail.com",
		billAddress: "120 Wall Street, New York City, NY",
		shipAddress: "120 Wall Street, New York City, NY",
		isAdmin: true,
		password: 'hermione'
	}, {
		id:4,
		name: "Harry Potter",
		email: "harrypotter@gmail.com",
		billAddress: "25 Smith Street, Salt Lake City, UT",
		shipAddress: "120 Wall Street, New York City, NYC",
		isAdmin: true,
		password: 'iamlordvoldemort'
	}, {
		id:5,
		name: "Ron Weaseley",
		email: "ronweaseley@gmail.com",
		billAddress: "55 Main Street, Houston, TX",
		shipAddress: "55 Main Street, Houston, TX",
		isAdmin: false,
		password: 'magiccarpet'
	}, {
		id:6,
		name: "Barack Obama",
		email: "bobama@yahoo.com",
		billAddress: "1600 Pennsylvania Ave., Washington, DC",
		shipAddress: "1600 Pennsylvania Ave., Washington, DC",
		isAdmin: true,
		password: 'prez4life'
	}, {
		id:7,
		name: "Joe Biden",
		email: "jbiden@hotmail.com",
		billAddress: "1600 Pennsylvania Ave., Washington, DC",
		shipAddress: "1600 Pennsylvania Ave., Washington, DC",
		isAdmin: false,
		password: 'obamasbestfriend'
	}, {
		id:8,
		name: "Michelle Obama",
		email: "mobama@gmail.com",
		billAddress: "1600 Pennsylvania Ave., Washington, DC",
		shipAddress: "1600 Pennsylvania Ave., Washington, DC",
		isAdmin: true,
		password: 'eatvegetables'
	}, {
		id:9,
		name: "Hermione Granger",
		email: "hgranger@gmail.com",
		billAddress: "55 Rodeo Drive, Las Vegas, NV",
		shipAddress: "55 Main Street, Houston, TX",
		isAdmin: false,
		password: 'firstInClass'
	}, {
		id:10,
		name: "Hillary Clinton",
		email: "hclinton@gmail.com",
		billAddress: "1678 5th Street, New York City, NY",
		shipAddress: "1678 5th Street, New York City, NY",
		isAdmin: false,
		password: '2016president'
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
	}, {
		id:11,
		title: "A review of Nvidia 2000",
		content: "This is a good cpu.",
		stars: 4,
		user_id:2,
		product_id:2
	}, {
		id:12,
		title: "A review of Nvidia 2000",
		content: "This is a good cpu.",
		stars: 4,
		user_id:2,
		product_id:2
	}, {
		id:13,
		title: "A review of Nvidia 2000",
		content: "This is a good cpu.",
		stars: 4,
		user_id:2,
		product_id:2
	}, {
		id:14,
		title: "A review of Nvidia 2000",
		content: "This is a good cpu.",
		stars: 4,
		user_id:2,
		product_id:2
	}, {
		id:15,
		title: "A review of Nvidia 2000",
		content: "This is a good cpu.",
		stars: 4,
		user_id:2,
		product_id:2
	}, {
		id:16,
		title: "A review of Nvidia 2000",
		content: "This is a good cpu.",
		stars: 4,
		user_id:2,
		product_id:2
	}, {
		id:17,
		title: "A review of Nvidia 2000",
		content: "This is a good cpu.",
		stars: 4,
		user_id:2,
		product_id:2
	}, {
		id:18,
		title: "A review of Nvidia 2000",
		content: "This is a good cpu.",
		stars: 4,
		user_id:2,
		product_id:2
	}, {
		id:19,
		title: "A review of Nvidia 2000",
		content: "This is a good cpu.",
		stars: 4,
		user_id:2,
		product_id:2
	}, {
		id:20,
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
		price: 300,
		category: "CPU",
		stock: 12
	}, {
		id:2,
		name: "Nvidia 2000",
		photoUrl: "http://www.fillmurray.com/400/400",
		description: "This is a good gpu",
		price: 200,
		category: "GPU",
		stock: 10
	}, {
		id:11,
		name: "Cooler Master HAF X - High Air Flow Full Tower Computer Case with Windowed Side Panel and USB 3.0 Ports",
		photoUrl: "http://images10.newegg.com/NeweggImage/ProductImageCompressAll1280/11-119-225-14.jpg?w=660&h=500",
		description: "The case that is held up as the benchmark for full towers, HAF X has remained the flagship of the highly popular High Air Flow Series (HAF).",
		price: 190,
		category: "Case",
		stock: 4,
	}, {
		id:12,
		name: "Corsair Carbide Series 200R Black Steel / Plastic Compact ATX Mid Tower Case",
		photoUrl: "http://images10.newegg.com/NeweggImage/ProductImageCompressAll1280/11-139-018-02.jpg?w=660&h=500",
		description: "Less work. More play. Build with the Carbide Series 200R and the only time you’ll need to pick up a screwdriver is to install the motherboard.",
		price: 60,
		category: "Case",
		stock: 55,
	}, {
		id:13,
		name: "DEEPCOOL GENOME II The Upgraded worldwide first unique gaming case with integrated 360mm liquid cooling system White case with Blue helix",
		photoUrl: "http://images10.newegg.com/ProductImageCompressAll1280/11-853-040-01.jpg?w=660&h=500",
		description: "As the successor to the widely acclaimed DeepCool Genome ATX PC Case, the Genome II is meticulously designed to push PC user experience a step further with a number of refinements.",
		price: 230,
		category: "Case",
		stock: 1
	}, {
		id:14,
		name: "EVGA GeForce GTX 1080 SC GAMING ACX 3.0, 08G-P4-6183-KR, 8GB GDDR5X, LED, DX12 OSD Support (PXOC)",
		photoUrl: "http://images10.newegg.com/ProductImageCompressAll1280/14-487-244_R01.jpg?w=660&h=500",
		description: "NVIDIA's flagship GeForce GTX 1080 is the most advanced gaming GPU ever created, powered by the new NVIDIA Pascal architecture.",
		price: 590,
		category: "GPU",
		stock: 17
	}, {
		id:15,
		name: "EVGA GeForce GTX 1060 6GB SSC GAMING ACX 3.0, 6GB GDDR5, LED, DX12 OSD Support (PXOC), 06G-P4-6267-KR",
		photoUrl: "http://images10.newegg.com/ProductImageCompressAll1280/14-487-275-01.jpg?w=660&h=500",
		description: "Quality card at an affordable price",
		price: 270,
		category: "GPU",
		stock: 10
	}, {
		id:16,
		name: "XFX Radeon R7 240 R7-240A-2TS2 2GB 128-Bit DDR3 PCI Express 3.0 Video Cards",
		photoUrl: "http://images10.newegg.com/ProductImageCompressAll1280/14-150-783_R01.jpg?w=660&h=500",
		description: "Starter GPU for an enthusiast beginning the hobby",
		price: 200,
		category: "GPU",
		stock: 10
	}, {
		id:17,
		name: "Nvidia 2000",
		photoUrl: "http://www.fillmurray.com/400/400",
		description: "This is a good gpu",
		price: 200,
		category: "HDD",
		stock: 10
	}, {
		id:18,
		name: "Nvidia 2000",
		photoUrl: "http://www.fillmurray.com/400/400",
		description: "This is a good gpu",
		price: 200,
		category: "HDD",
		stock: 10
	}, {
		id:19,
		name: "Nvidia 2000",
		photoUrl: "http://www.fillmurray.com/400/400",
		description: "This is a good gpu",
		price: 200,
		category: "HDD",
		stock: 10
	}, {
		id:20,
		name: "Nvidia 2000",
		photoUrl: "http://www.fillmurray.com/400/400",
		description: "This is a good gpu",
		price: 200,
		category: "SSD",
		stock: 10
	}], product => db.model('products').create(product))

const seedCart = () => db.Promise.map(
	[{
		id: 1,
		products: [1, 2],
		totalPrice: 0 
}], cart => db.model('carts').create(cart))


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
	.then(seedCart)
	.then((cart) => console.log(`Seeded cart with ${cart[0].totalPrice} products OK`))
	.catch(error => console.error(error))
	.finally(() => db.close())



