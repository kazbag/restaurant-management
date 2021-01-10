const bcrypt = require("bcrypt");
const pusher = require("pusher-js");
const User = require("./models/Users");


const users = [
  {
    // 123/123
    name: "123",
    password: "$2b$10$KSAfjDM1aEkoAU/vW7HH9O2eATiClAJrKDSE1cVlSPNMdZSo5KOvW",
    role: "user",
    address: "szklarska 37 Kraków",
    phone: "665-229-923",
    userId: "1",
  },
  // admin/123
  {
    // admin/123
    name: "admin",
    password: "$2b$10$KSAfjDM1aEkoAU/vW7HH9O2eATiClAJrKDSE1cVlSPNMdZSo5KOvW",
    role: "admin",
  },
  {
    // chef/123
    name: "chef",
    password: "$2b$10$KSAfjDM1aEkoAU/vW7HH9O2eATiClAJrKDSE1cVlSPNMdZSo5KOvW",
    role: "employee",
  },
];

const loginUser = async (name, password) => {
  const user = users.find((user) => user.name === name);
  if (!user) {
    return [null, "cannot find user"];
  }
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return [null, "invalid password"];
  }
  return [user, null];
};

const registerUser = async (name, password) => {
  //const userInDatabase = users.find((user) => user.name === name);
  //if (userInDatabase) {
  //return [null, "user already exists"];
  // }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = {
    name,
    password: hashedPassword,
    role: "user",
  };


  return [user, null];
};

module.exports = {
  loginUser,
  registerUser,
};
