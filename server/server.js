require("dotenv").config();

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");

const latestNewsRoutes = require("./routes/latestNews");
const ordersRoutes = require("./routes/orders");
const productsRoutes = require("./routes/products");
const discountCodesRoutes = require("./routes/discountCodes");
const usersRoutes = require("./routes/users");

const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");


const originUrl = process.env.ORIGIN_URL || "http://localhost:3000";
const port = process.env.PORT || 3001;

const {
  createSession,
  fetchSession,
  removeSession,
  checkSession,
} = require("./SessionService");
const { loginUser, registerUser } = require("./UserRepository");
const { collection } = require("./models/Users");

//swagger
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "RestaurantAPI",
      description: "Restaurant Menagement API documentation",
      contact: {
        name: "Dev Filip",
      },
      servers: ["http://localhost:3001"],
    },
  },
  apis: [
    "routes/discountCodes.js",
    "routes/orders.js",
    "routes/products.js",
    "routes/users.js",
  ],
};
swaggerDocs = swaggerJsDoc(swaggerOptions);
// end swagger

mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true }, () =>
  console.log("connected to DB")
);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection Error:"));

db.once("open", () => {
  const app = express();

  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
  app.use(cookieParser());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(cors({ credentials: true, origin: originUrl }));
  //app.use(ordersRoutes);
  app.use("/orders", ordersRoutes);
  app.use("/discountCodes", discountCodesRoutes);
  app.use("/products", productsRoutes);
  app.use("/users", usersRoutes);
  app.use("/news", latestNewsRoutes);
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
    const token = req.cookies.session;
    if (!token) return;
    console.log("Token in check endpoint ", token);
    const [user, error] = await checkSession(token);
    if (!user) {
      res.status(400).send(error);
      next();
      return;
    } else {
      res.send(user);
    }
  });

  app.get("/private", authorizationChain, (req, res) => {
    res.json({ session: req.session });
  });

  app.post("/register", async (req, res) => {
    const { name, password } = req.body;
    const user = await registerUser(name, password);

    res.json(user);

  });

  app.post("/login", async (req, res) => {
    const { login, password, role } = req.body;
    const [user, error] = await loginUser(login, password);
    console.log(req.data)
    console.log(req.body)
    if (error) {
      res.status(400).send(error);
    } else {
      const token = createSession(user);
      res.cookie("session", token, { maxAge: 900000, httpOnly: true });
      res.json({
        token,
        user: {
          name: user.name,
          role: user.role,
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

  // pusher
  var Pusher = require("pusher");

  var pusher = new Pusher({
    appId: process.env.PUSHER_APP_ID,
    key: process.env.PUSHER_KEY,
    secret: process.env.PUSHER_SECRET,
    cluster: process.env.PUSHER_CLUSTER,
    encrypted: true,
  });
  const channel = "my-channel";
  pusher.trigger("my-channel", "my-event", {
    message: "hello world",
  });

  app.listen(port, () => console.log(`app listening on port ${port}!`));

  const ordersCollection = db.collection("orders");
  const changeStream = ordersCollection.watch();

  changeStream.on("change", (change) => {
    console.log(change);
    if (change.operationType === "insert") {
      const order = change.fullDocument;
      pusher.trigger(channel, "inserted", {
        id: order._id,
        order: order.order,
      });
    } else if (change.operationType === "delete") {
      pusher.trigger(channel, "deleted", change.documentKey._id);
    } else if (change.operationType === "update") {
      pusher.trigger(channel, "updated", change.documentKey._id);
    }
  });
});
