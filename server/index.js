const express = require("express");
const cors = require("cors");
const Razorpay = require("razorpay")
const app = express();
const { products } = require("./data");
// const {}

//razorpay instance
const instance = new Razorpay({
    key_id: 'rzp_test_uiY5t3gqDawfsr',
    key_secret: 'IU0ROkZeSmBRLFgK2rJxuda8'
})

app.use(cors());
app.use(express.json());

app.get("/products", (req, res) => {
    res.status(200).json(products);
})

app.get("/order/:productId", (req, res) => {
    const { productId } = req.params
    const product = products.find(product => product.id == productId);
    const amount = product.price * 100 * 70;
    const currency = "INR";
    //receipt generated unique from database
    const receipt = "receipt#123";
    const notes = { name: product.name, desc: product.desc };

    instance.orders.create({ amount, currency, receipt, notes }, (error, order) => {
        if (error) {
            return res.status(500).json(error);
        }
        return res.status(200).json(order);
    })

    console.log(product);
})


//For later..

// app.post('/verification', (req, res) => {
// 	// do a validation
// 	const secret = 'amrit12345'

// 	console.log(req.body)

// 	const crypto = require('crypto')

// 	const shasum = crypto.createHmac('sha256', secret)
// 	shasum.update(JSON.stringify(req.body))
// 	const digest = shasum.digest('hex')

// 	console.log(digest, req.headers['x-razorpay-signature'])

// 	if (digest === req.headers['x-razorpay-signature']) {
// 		console.log('request is legit')
// 		// process it
// 		require('fs').writeFileSync('payment1.json', JSON.stringify(req.body, null, 4));
//         res.status(200).json(JSON.stringify(req.body));
// 	} else {
// 		// pass it
// 	}
// 	// res.json({ status: 'ok' })
// })



app.listen(8000, () => {
    console.log("server listening on port 8000");


})




//To expose localhost to liveserver we use ngrock