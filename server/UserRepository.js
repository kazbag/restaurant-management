const bcrypt = require("bcrypt");
const Users = require("./models/Users");

const loginUser = async (login, password) => {
  const user = await Users.findOne({ login: login });
  if (!user) {
    return [null, "cannot find user"];
  }
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return [null, "invalid password"];
  }
  return [user, null];
};

module.exports = {
  loginUser,
};
