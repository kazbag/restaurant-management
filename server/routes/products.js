const express = require('express');
const router = express.Router();
const Products = require('../models/Products');

router.get('/', async (req, res) => {
    try {
        const products = await Products.find();
        res.json(products);

    } catch (err) {
        res.json({ message: err })
    }

})

router.get('/:productId', async (req, res) => {
    try {
        const product = await Products.findById(req.params.productId);
        res.json(product);

    } catch (err) {
        res.json({ message: err })
    }

})




router.post('/', async (req, res) => {
    const product = new Products({
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        photo: req.body.photo,
        category: req.body.category

    });
    try {
        const savedProduct = await product.save()
        res.json(savedProduct);
    } catch (err) {
        res.json({ message: err })
    }

})

router.delete('/:productId', async (req, res) => {
    try {
        const removedProducts = await Products.remove({ _id: req.params.prdocutId })
        res.json(removedProducts);
    }
    catch (err) {
        res.json({ message: err })
    }

})

router.patch('/:productId', async (req, res) => {
    try {
        const updatedProducts = await Products.updateOne(
            { _id: req.params.postId },
            { $set: { name: req.body.name } }
        )

        res.json(updatedProducts);
    }
    catch (err) {
        res.json({ message: err })
    }

})


module.exports = router;