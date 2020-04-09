/**
 * Sessions
 */
let sessions = [{ token: "abc", user: { name: "Andrzej" } }];

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
  const session = { token, user: { name: user.name } };
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
};
