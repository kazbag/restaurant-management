require("dotenv").config();

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const express = require("express");
const originUrl = process.env.ORIGIN_URL || "http://localhost:3000";
const port = process.env.PORT || 3001;

const {
  createSession,
  fetchSession,
  removeSession,
  checkSession,
} = require("./SessionService");
const { loginUser, registerUser } = require("./UserRepository");

const app = express();

var pgp = require("pg-promise")(/* options */);
var db = pgp(process.env.DATABASE_URL);

db.one("SELECT $1 AS value", 123)
  .then(function (data) {
    console.log("DATA:", data.value);
  })
  .catch(function (error) {
    console.log("ERROR:", error);
  });

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({ credentials: true, origin: originUrl }));

const cookieTokenExtractor = (cookieName) => (req, res, next) => {
  req.token = req.cookies[cookieName];
  next();
};

const authorizationHeaderTokenExtractor = (req, res, next) => {
  const authorizationHeader = req.headers.authorization;
  if (authorizationHeader) {
    req.token = authorizationHeader.replace("bearer ", "");
  }
  next();
};

const secured = (req, res, next) => {
  let token = req.token;
  if (!token) {
    res.status(401).send("access denied, no token provided");
  } else {
    const session = fetchSession(token);
    if (session) {
      req.token = token;
      req.session = session;
      next();
    } else {
      res.status(401).send("Invalid token");
    }
  }
};

const authorizationChain = [
  cookieTokenExtractor("session"),
  authorizationHeaderTokenExtractor,
  secured,
];

app.get("/", (req, res) => res.send("witaj na stronie"));

app.post("/check", async (req, res, next) => {
  res.set("Access-Control-Allow-Origin", originUrl);
  res.set("Access-Control-Allow-Credentials", true);
  res.set("Set-Cookie", "HttpOnly;Secure;SameSite=None");
  const token = req.cookies.session;
  if (!token) return;
  console.log("Token in check endpoint ", token);
  const [user, error] = await checkSession(token);
  if (!user) {
    next();
    res.status(400).send(error);
  } else {
    res.send("ok!");
  }
});

app.get("/private", authorizationChain, (req, res) => {
  res.json({ session: req.session });
});

app.post("/register", async (req, res) => {
  const { name, password } = req.body;
  const [user, error] = await registerUser(name, password);
  if (error) {
    res.status(409).send(error);
  } else {
    res.json({ user: { name: user.name } });
  }
});

app.post("/login", async (req, res) => {
  res.set("Access-Control-Allow-Origin", originUrl);
  res.set("Access-Control-Allow-Credentials", true);
  res.set("Set-Cookie", "HttpOnly;Secure;SameSite=None");
  const { name, password } = req.body;
  const [user, error] = await loginUser(name, password);
  if (error) {
    res.status(400).send(error);
  } else {
    const token = createSession(user);
    res.cookie("session", token, { maxAge: 900000, httpOnly: true });
    res.json({
      token,
      user: {
        name: user.name,
      },
      message: "everything is ok from server",
    });
  }
});

app.post("/logout", authorizationChain, async (req, res) => {
  console.log(req.token + " req token");
  removeSession(req.token, req.session.user.name);
  res.clearCookie("session");
  res.redirect("/");
});

app.listen(port, () => console.log(`app listening on port ${port}!`));
