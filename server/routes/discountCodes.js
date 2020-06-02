const express = require('express');
const router = express.Router();
const DiscountCodes = require('../models/DiscountCodes');

router.get('/', async (req, res) => {
    try {
        const discountCodes = await DiscountCodes.find();
        res.json(discountCodes);

    } catch (err) {
        res.json({ message: err })
    }

})

router.get('/:discountCodeId', async (req, res) => {
    try {
        const discountCodes = await DiscountCodes.findById(req.params.discountCodeId);
        res.json(discountCodes);

    } catch (err) {
        res.json({ message: err })
    }

})




router.post('/', async (req, res) => {
    const discountCodes = new DiscountCodes({
        code: req.body.code,
        startDate: req.body.startDate,
        expirationDate: req.body.expirationDate,
        value: req.body.value,
        percentage: req.body.percentage,
        reusable: req.body.reusable,
        used: req.body.used,
    });
    try {
        const savedDiscountCodes = await discountCodes.save()
        res.json(savedDiscountCodes);
    } catch (err) {
        res.json({ message: err })
    }

})

router.delete('/:discountCodeId', async (req, res) => {
    try {
        const removedDiscountCodes = await DiscountCodes.remove({ _id: req.params.discountCodeId })
        res.json(removedDiscountCodes);
    }
    catch (err) {
        res.json({ message: err })
    }

})

router.patch('/:discountCodeId', async (req, res) => {
    try {
        const updatedDiscountCodes = await DiscountCodes.updateOne(
            { _id: req.params.discountCodeId },
            {
                $set:
                {
                    code: req.body.code,
                    startDate: req.body.startDate,
                    expirationDate: req.body.expirationDate,
                    value: req.body.value,
                    percentage: req.body.percentage,
                    reusable: req.body.reusable,
                    used: req.body.used,


                }
            }
        )

        res.json(updatedDiscountCodes);
    }
    catch (err) {
        res.json({ message: err })
    }

})


module.exports = router;