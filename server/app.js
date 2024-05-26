require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 6005;
const crypto = require("crypto");
const { Cashfree } = require("cashfree-pg");
const session = require("express-session");
const passport = require("passport");
const OAuth2Strategy = require("passport-google-oauth2").Strategy;
const userdb = require("./models/userSchema");
const createEvents = require("./models/newEventSchema");
const eventsRouter = require("./routes/eventRouter");

require("./db/conn");
require("dotenv").config();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use("/create", createEvents);

const clientId =
  "1012938867631-7huiqi3vtrsukr7i43v5mfp0n728lbic.apps.googleusercontent.com";
const clientSecret = "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";

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

app.post("/", async (req, res) => {
  let event = createEvents(req.body);
  let result = await event.save();
  res.send(result);
});

//get data
app.use("/api", eventsRouter);
//setuo session
app.use(
  session({
    secret: "sdfdsf4ds45ds4fds54nmnfd5s4f",
    resave: false,
    saveUninitialized: true,
  })
);
//setup passport
app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new OAuth2Strategy(
    {
      clientID: clientId,
      clientSecret: clientSecret,
      callbackURL: "/auth/google/callback",
      scope: ["profile", "email"],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await userdb.findOne({ googleId: profile.id });
        if (!user) {
          user = new userdb({
            googleId: profile.id,
            displayName: profile.displayName,
            email: profile.emails[0].value,
            image: profile.photos[0].value,
          });
          await user.save();
        }
        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

//initial google auth login
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "http://localhost:3000/dashboard",
    failureRedirect: "http://localhost:3000/login",
  })
);

app.use("/api", require("./routes/auth"));

app.get("/login/sucess", async (req, res) => {
  if (req.user) {
    res.status(200).json({ message: "login successfull", user: req.user });
  } else {
    res.status(400).json({ message: "login failed" });
  }
});
app.get("/logout", (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
  });
  res.redirect("http://localhost:3000/");
});




//payment methods

Cashfree.XClientId = process.env.CLIENT_ID;
Cashfree.XClientSecret = process.env.CLIENT_SECRET;
Cashfree.XEnvironment = Cashfree.Environment.SANDBOX;

function generateOrderId() {
  const uniqueId = crypto.randomBytes(16).toString("hex");

  const hash = crypto.createHash("sha256");
  hash.update(uniqueId);

  const orderId = hash.digest("hex");

  return orderId.substr(0, 12);
}

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/payment", async (req, res) => {
  try {
    let request = {
      order_amount: 1.0,
      order_currency: "INR",
      order_id: await generateOrderId(),
      customer_details: {
        customer_id: "webcodder01",
        customer_phone: "9999999999",
        customer_name: "Web Codder",
        customer_email: "webcodder@example.com",
      },
    };

    Cashfree.PGCreateOrder("2023-08-01", request)
      .then((response) => {
        console.log(response.data);
        res.json(response.data);
      })
      .catch((error) => {
        console.error(error.response.data.message);
      });
  } catch (error) {
    console.log(error);
  }
});

app.post("/verify", async (req, res) => {
  try {
    let { orderId } = req.body;

    Cashfree.PGOrderFetchPayments("2023-08-01", orderId)
      .then((response) => {
        res.json(response.data);
      })
      .catch((error) => {
        console.error("Error fetching payment order");
        console.error(error.response.data.message);
      });
  } catch (error) {
    console.log(error);
  }
});

app.listen(PORT, () => {
  console.log(`server started at port no ${PORT}`);
});


