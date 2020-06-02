const express = require('express');
const router = express.Router();
const Orders = require('../models/Orders');

router.get('/', async (req, res) => {
    try {
        const orders = await Orders.find();
        res.json(orders);

    } catch (err) {
        res.json({ message: err })
    }

})

router.get('/:orderId', async (req, res) => {
    try {
        const order = await Orders.findById(req.params.orderId);
        res.json(order);

    } catch (err) {
        res.json({ message: err })
    }

})




router.post('/', async (req, res) => {
    const order = new Orders({
        price: req.body.price,
        orderDate: req.body.orderDate,
        paymentStatus: req.body.paymentStatus,
        orderStatus: req.body.orderStatus,
        products: req.body.products

    });
    try {
        const savedOrder = await order.save()
        res.json(savedOrder);
    } catch (err) {
        res.json({ message: err })
    }

})

router.delete('/:orderId', async (req, res) => {
    try {
        const removedOrder = await DiscountCodes.remove({ _id: req.params.orderId })
        res.json(removedOrder);
    }
    catch (err) {
        res.json({ message: err })
    }

})

router.patch('/:orderId', async (req, res) => {
    try {
        const updatedOrder = await Orders.updateOne(
            { _id: req.params.orderId },
            {
                $set:
                {
                    price: req.body.price,
                    orderDate: req.body.orderDate,
                    paymentStatus: req.body.paymentStatus,
                    orderStatus: req.body.orderStatus,
                    products: req.body.products

                }
            }
        )

        res.json(updatedOrder);
    }
    catch (err) {
        res.json({ message: err })
    }

})


module.exports = router;