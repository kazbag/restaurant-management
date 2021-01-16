const Users = require("./models/Users");
/**
 * Sessions
 */
const sessions = [{ token: "abc", user: { name: "Andrzej" } }];
/**
 * Checking permisions
 *
 * @param {*} userRole role which user has
 */
const getAuth = (requiredRole) => async (req, res, next) => {
  try {
    console.log(req.body);
    console.log(req.headers);
    const { login, token } = req.body;
    const session = sessions.find((session) => session.token === token);
    const user = await Users.findOne({ login: login });
    console.log(user);
    if (token === session.token && user.role === requiredRole) {
      next();
    } else {
      res.status(403).send("Nie masz dostępu do tej strony!");
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
};
/**
 * Fetch user session by token
 *
 * @param {Token} token Authentication token
 */
const fetchSession = (token) => {
  const session = sessions.find((session) => session.token === token);

  return session;
};

/**
 * Create new session
 */
const createSession = (user) => {
  const token = Math.floor(Math.random() * 1000000000000).toString(36);
  const session = { token, user: { name: user.name, role: user.role } };
  sessions.push(session);

  return token;
};

/**
 * Remove user session
 */
const removeSession = (token, login) => {
  sessions = sessions.filter(
    (session) => session.token !== token && session.user.login !== login
  );
  console.log("current sessions after remove ", sessions);
};

const checkSession = (token) => {
  return [sessions.find((session) => session.token === token), null];
};

module.exports = {
  createSession,
  fetchSession,
  removeSession,
  checkSession,
  getAuth,
};
