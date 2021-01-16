const express = require("express");
const router = express.Router();
const Users = require("../models/Users");
const bcrypt = require("bcrypt");
const { getAuth } = require("../SessionService");

/**
 * @swagger
 * /users:
 *  get:
 *    description: get all the users
 *    responses:
 *      '200':
 *        description: succesful repsonse
 */
router.get("/", getAuth("admin"), async (req, res) => {
  try {
    const users = await Users.find();
    res.json(users);
  } catch (err) {
    res.json({ message: err });
  }
});

/**
 * @swagger
 * /users/{userId}:
 *  get:
 *    description: get the user with particular Id
 *    parameters:
 *      - name: userId
 *        in: path
 *        description: id parameter of the user
 *        type: string
 *    responses:
 *      '200':
 *        description: succesful repsonse
 */
router.get("/:userId", getAuth("employee"), async (req, res) => {
  try {
    const user = await Users.findById(req.params.userId);
    res.json(user);
  } catch (err) {
    res.json({ message: err });
  }
});

/**
 * @swagger
 * /users:
 *  post:
 *    description: post the users
 *    parameters:
 *      - name: name
 *        in: formData
 *        type: string
 *      - name: surname
 *        in: formData
 *        type: string
 *      - name: login
 *        in: formData
 *        type: string
 *      - name: password
 *        in: formData
 *        type: string
 *      - name: email
 *        in: formData
 *        type: string
 *      - name: city
 *        in: formData
 *        type: string
 *      - name: role
 *        in: formData
 *        type: string
 *    responses:
 *      '200':
 *        description: succesful repsonse
 */
// TODO: think about it - new user should be able to create an account, shouldn't be? but also only admin should be able to create user with other role than user.
// to discuss - should we make 2 separated routes for register or validate here is user admin
router.post("/", async (req, res) => {
  console.log(req.headers);
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const user = new Users({
    name: req.body.name,
    surname: req.body.surname,
    login: req.body.login,
    password: hashedPassword,
    email: req.body.email,
    city: req.body.city,
    role: req.body.role,
    address: req.body.address,
  });
  const userInDatabase = await Users.findOne({ login: user.login });
  if (userInDatabase) {
    return res.status(400).send("user already registered");
  } else {
    try {
      const savedUser = await user.save();
      res.json(savedUser);
    } catch (err) {
      res.json({ message: err });
    }
  }
});

/**
 * @swagger
 * /users/{userId}:
 *  delete:
 *    description: delete the user with particular Id
 *    parameters:
 *      - name: userId
 *        in: path
 *        description: id parameter of the user
 *        type: string
 *    responses:
 *      '200':
 *        description: succesful repsonse
 */
router.delete("/:userId", getAuth("admin"), async (req, res) => {
  try {
    const removedUser = await Users.remove({ _id: req.params.userId });
    res.json(removedUser);
  } catch (err) {
    res.json({ message: err });
  }
});

/**
 * @swagger
 * /users/{userId}:
 *  patch:
 *    description: patch the user with particular Id
 *    parameters:
 *      - name: userId
 *        in: path
 *        description: id parameter of the user
 *        type: string
 *      - name: name
 *        in: formData
 *        type: string
 *      - name: surname
 *        in: formData
 *        type: string
 *      - name: login
 *        in: formData
 *        type: string
 *      - name: password
 *        in: formData
 *        type: string
 *      - name: email
 *        in: formData
 *        type: string
 *      - name: city
 *        in: formData
 *        type: string
 *      - name: role
 *        in: formData
 *        type: string
 *    responses:
 *      '200':
 *        description: succesful repsonse
 */
router.patch("/:userId", getAuth("admin"), async (req, res) => {
  try {
    const updatedUser = await Users.updateOne(
      { _id: req.params.userId },
      {
        $set: {
          name: req.body.name,
          surname: req.body.surname,
          login: req.body.login,
          password: req.body.password,
          email: req.body.email,
          city: req.body.city,
          role: req.body.role,
        },
      }
    );

    res.json(updatedUser);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
