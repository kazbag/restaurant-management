const express = require('express');
const router = express.Router();
const Users = require('../models/Users');

router.get('/', async (req, res) => {
    try {
        const users = await Users.find();
        res.json(users);

    } catch (err) {
        res.json({ message: err })
    }

})

router.get('/:userId', async (req, res) => {
    try {
        const user = await Users.findById(req.params.userId);
        res.json(user);

    } catch (err) {
        res.json({ message: err })
    }

})




router.post('/', async (req, res) => {
    const user = new Users({
        name: req.body.name,
        surname: req.body.surname,
        login: req.body.login,
        password: req.body.password,
        email: req.body.email,
        city: req.body.city,
        role: req.body.role

    });
    try {
        const savedUser = await user.save()
        res.json(savedUser);
    } catch (err) {
        res.json({ message: err })
    }

})

router.delete('/:userId', async (req, res) => {
    try {
        const removedUser = await Users.remove({ _id: req.params.userId })
        res.json(removedUser);
    }
    catch (err) {
        res.json({ message: err })
    }

})

router.patch('/:userId', async (req, res) => {
    try {
        const updatedUser = await Users.updateOne(
            { _id: req.params.userId },
            { $set: { name: req.body.name } }
        )

        res.json(updatedUser);
    }
    catch (err) {
        res.json({ message: err })
    }

})


module.exports = router;