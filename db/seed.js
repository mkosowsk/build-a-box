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
		title: "Amazing CPU",
		content: "This is an incredible \"bang for the buck\" CPU.",
		stars: 4,
		user_id:5,
		product_id:1,
	}, {
		id:2,
		title: "Good but slightly too expensive",
		content: "Handled everything I threw at it, from benchmarks to games. Price is a bit too high",
		stars: 3,
		user_id:2,
		product_id:2,
	}, {
		id:3,
		title: "Perfect budget board",
		content: "It met all my requirements for a lower-end gaming build. Enough space for all my drives and devices, with room to grow.",
		stars: 5,
		user_id:4,
		product_id:4,
	}, {
		id:4,
		title: "Not flashy but gets the job done",
		content: "Threw together a PC for my father, only going to be used for web browsing and streaming videos. Perfect RAM for the price point. ",
		stars: 5,
		user_id:8,
		product_id:10,
	}, {
		id:5,
		title: "Terrible Experience",
		content: "The K means unlocked for overclocking. First time with very slight overclock, it blew itself up. Could be luck of the draw but this experience left a bad taste in my mouth. Moving to AMD for this generation of CPUs.",
		stars: 1,
		user_id:3,
		product_id:6,
	}, {
		id:6,
		title: "Awesome!",
		content: "Blazingly fast GPU!",
		stars: 5,
		user_id:7,
		product_id:14,
	}, {
		id:7,
		title: "Not worth the price",
		content: "Simply too expensive for what amounts to a small performance gain.",
		stars: 1,
		user_id:5,
		product_id:14,
	}, {
		id:8,
		title: "This SSD is amazing",
		content: "This SSD makes computing pure joy.",
		stars: 5,
		user_id:6,
		product_id:20,
	}, {
		id:9,
		title: "Great case!",
		content: "A bit pricey but worth it",
		stars: 4,
		user_id:3,
		product_id:11,
	}, {
		id:10,
		title: "Solid HDD",
		content: "Good hard disk at a good price",
		stars: 4,
		user_id:8,
		product_id:17,
	}], review => db.model('reviews').create(review))

const seedProducts = () => db.Promise.map(
	[{
		id:1,
		name: "AMD A4-6300",
		photoUrl: "https://images10.newegg.com/NeweggImage/ProductImage/19-113-349-02.jpg",
		description: "Richland Dual-Core 3.7 GHz with AMD Radeon HD 8370D onboard graphics, with an FM2 Socket, that uses 65W.",
		price: 34,
		category: "CPU",
		stock: 52,
	}, {
		id:2,
		name: "Intel Core i7-4690X",
		photoUrl: "https://images10.newegg.com/NeweggImage/ProductImage/19-116-938-04.jpg",
		description: "Ivy Bridge-E 6-Core 3.6 GHz (Turbo 4 GHz) with an LGA 2011 socket, that uses 130W.",
		price: 2810,
		category: "CPU",
		stock: 3,
	}, {
		id:3,
		name: "ASUS ROG STRIX Z270E",
		photoUrl: "https://images10.newegg.com/ProductImage/13-132-928-V01.jpg",
		description: "A gaming ATX motherboard. It has an LGA1151 Socket, is DDR4 RAM and USB 3.1 ready, with onboard Wi-Fi.",
		price: 200,
		category: "Motherboard",
		stock: 22,
	}, {
		id:4,
		name: "GIGABYTE GA-B150M-DS3H",
		photoUrl: "https://images10.newegg.com/ProductImage/13-128-881-07.jpg",
		description: "A Micro ATX Intel Motherboard. It has an LGA1151 Socket, is DDR4 RAM and USB 3.0 ready, with HDMI.",
		price: 60,
		category: "Motherboard",
		stock: 43,
	}, {
		id:5,
		name: "MSI X99A GodLike",
		photoUrl: "https://images10.newegg.com/ProductImage/13-130-921-08.jpg",
		description: "A gaming extended ATX motherboard, with carbon skin armor. It has an LGA2011-v3 socket, is DDR4 RAM and USB 3.1 ready.",
		price: 580,
		category: "Motherboard",
		stock: 9,
	}, {
		id:6,
		name: "Intel Core i7-7700K",
		photoUrl: "https://images10.newegg.com/ProductImage/19-117-726-Z01.jpg",
		description: "Kaby Lake Quad-Core 4.2 GHz with Intel HD Graphics 630, an LGA 1151 socket, that uses 91W.",
		price: 350,
		category: "CPU",
		stock: 34,
	}, {
		id:7,
		name: "HyperX Fury 8GB",
		photoUrl: "https://images10.newegg.com/ProductImage/20-104-444-05.jpg",
		description: "Single stick of 240-PIN 8GB DDR3 1600.",
		price: 66,
		category: "RAM",
		stock: 76,
	}, {
		id:8,
		name: "G.SKILL TridentZ Series 128GB",
		photoUrl: "https://images10.newegg.com/ProductImage/20-232-334-01.jpg",
		description: "Eight sticks of powerful 288-PIN 16GB DDR4 3200.",
		price: 1100,
		category: "RAM",
		stock: 14,
	}, {
		id:9,
		name: "Ballistix Sport 16GB",
		photoUrl: "https://images10.newegg.com/NeweggImage/ProductImage/20-148-545-02.jpg",
		description: "Two sticks of 240-PIN 8GB DDR3 1600.",
		price: 102,
		category: "RAM",
		stock: 24,
	}, {
		id:10,
		name: "G.SKILL Value 4GB",
		photoUrl: "https://images10.newegg.com/NeweggImage/ProductImage/20-231-423-02.jpg",
		description: "Single Stick of 240-PIN 4GB DDR3 1333.",
		price: 24,
		category: "RAM",
		stock: 87,
	}, {
		id:11,
		name: "COOLER MASTER HAF X High Air Flow Full Tower Computer Case with Windowed Side Panel and USB 3.0 Ports",
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
		stock: 17,
	}, {
		id:15,
		name: "EVGA GeForce GTX 1060 6GB SSC GAMING ACX 3.0, 6GB GDDR5, LED, DX12 OSD Support (PXOC), 06G-P4-6267-KR",
		photoUrl: "http://images10.newegg.com/ProductImageCompressAll1280/14-487-275-01.jpg?w=660&h=500",
		description: "Quality card at an affordable price",
		price: 270,
		category: "GPU",
		stock: 10,
	}, {
		id:16,
		name: "XFX Radeon R7 240 R7-240A-2TS2 2GB 128-Bit DDR3 PCI Express 3.0 Video Cards",
		photoUrl: "http://images10.newegg.com/ProductImageCompressAll1280/14-150-783_R01.jpg?w=660&h=500",
		description: "Starter GPU for an enthusiast beginning the hobby",
		price: 56,
		category: "GPU",
		stock: 88,
	}, {
		id:17,
		name: "Seagate Desktop HDD ST1000DM003 1TB 64MB Cache SATA 6.0Gb/s 3.5 Internal Hard Drive Bare Drive",
		photoUrl: "http://images10.newegg.com/productimage/22-148-840-10.jpg",
		description: "The Seagate Desktop HDD is the one drive for every desktop system need, supported by 30 years of trusted performance, reliability and simplicity",
		price: 50,
		category: "HDD",
		stock: 106,
	}, {
		id:18,
		name: "TOSHIBA P300 HDWD130XZSTA 3TB 7200 RPM 64MB Cache SATA 6.0Gb/s 3.5 Desktop Internal Hard Drive Retail Packaging",
		photoUrl: "http://images10.newegg.com/ProductImageCompressAll1280/22-149-633_R01.jpg?w=660&h=500",
		description: "The TOSHIBA P300 is a great drive upgrade for desktop computers. It features high specifications for high performance, and rich hard driver technologies for great reliability and low power consumption.",
		price: 98,
		category: "HDD",
		stock: 29,
	}, {
		id:19,
		name: "WD Blue 1TB Desktop Hard Disk Drive - 7200 RPM SATA 6Gb/s 64MB Cache 3.5 Inch - WD10EZEX",
		photoUrl: "http://images10.newegg.com/ProductImageCompressAll1280/22-236-339-V01.jpg?w=660&h=500",
		description: "Next best thing to an SSD",
		price: 50,
		category: "HDD",
		stock: 17,
	}, {
		id:20,
		name: "SAMSUNG 850 EVO 2.5 500GB SATA III 3-D Vertical Internal Solid State Drive (SSD) MZ-75E500B/AM",
		photoUrl: "http://images10.newegg.com/ProductImageCompressAll1280/20-147-373_R01.jpg?w=660&h=500",
		description: "Samsung's 850 EVO series SSD is the industry's #1 best-selling SSD and is perfect for everyday computing.",
		price: 183,
		category: "SSD",
		stock: 55
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



