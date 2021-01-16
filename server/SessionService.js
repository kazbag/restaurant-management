const Users = require("./models/Users");
/**
 * Sessions
 */
let sessions = [];
/**
 * Checking permisions
 *
 * @param {*} userRole role which user has
 */

// requiredRoles can be either just one role as string e.g. getAuth('admin') or an array of strings: getAuth(['admin', 'employee', 'anyOtherRole'])
const getAuth = (requiredRoles) => async (req, res, next) => {
  try {
    // try to retreive cookie header
    const cookie = req.headers.cookie;
    console.log(req.headers);

    // if there's no cookie it means that user is almost for sure not logged in
    if (!cookie) {
      return res.status(403).send("Zaloguj się.");
    }
    // header cookie looks like session=$____TOKEN____$ so we need to replace 'session=' to empty string
    const token = cookie.replace("session=", "");

    // find session where token is equal to requested token
    const userSession = sessions.find((s) => s.token === token);

    // if in session there is not token as requested, something have to be wrong
    if (!userSession) {
      res.status(403).send("Zaloguj się");
    }
    // retreive login from session
    const userLogin = userSession.user.login;

    // check again that token matches and now that is also login valid
    const session = sessions.find(
      (s) => s.token === token && s.user.login === userLogin
    );

    // if one of params is invalid, returns error and don't pass further
    if (!session) {
      return res.status(403).send("Zaloguj się.");
    }

    // if everything is ok, find user in database and check his role. yes, we have role in session but database check will be more safe I think
    const user = await Users.findOne({ login: userLogin });

    // check one more time that is token valid and is user role allowed to access resources from specific endpoint
    if (
      (token === session.token && requiredRoles.indexOf(user.role) > -1) ||
      // admin can access anything
      user.role === "admin"
    ) {
      // if role is valid, allow to access data
      next();
    } else {
      // otherwise return forbidden
      res.status(403).send("Nie masz dostępu do tej strony!");
    }
  } catch (err) {
    // if something else went wrong, just send message
    res
      .status(500)
      .send(
        "Niestety coś poszło nie tak. Spróbuj ponownie, lub skontaktuj się z administratorem."
      );
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
  const session = { token, user: { login: user.login, role: user.role } };
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
  // TODO: remove
  // console.log("current sessions after remove ", sessions);
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
