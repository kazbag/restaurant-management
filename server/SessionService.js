const Users = require("./models/Users")
/**
 * Sessions
 */
const sessions = [{ token: "abc", user: { name: "Andrzej" } }];
/**
 * Checking permisions
 * 
 * @param {*} userRole role which user has
 */
const getAuth = (userRole) => async (req, res, next) => {
  try {
    const { login, token } = req.body;
    const session = sessions.find((session) => session.token === token);
    const { role } = await Users.findOne({ login: login });

    if (
      (token === session.token && role === "user") ||
      (token === session.token && role === "chef") ||
      (token === session.token && role === "admin")
    ) {
      next();
    } else {

      res.status(403).send("Nie masz dostępu do tej strony!");
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
}
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
const removeSession = (token, name) => {
  sessions = sessions.filter(
    (session) => session.token !== token && session.user.name !== name
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
  getAuth
};
