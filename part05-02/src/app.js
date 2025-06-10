const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const passport = require("passport");

const dotenv = require("dotenv");
dotenv.config();

const User = require("./models/users.model");

const { default: mongoose } = require("mongoose");
const { error } = require("console");

const app = express();
const port = 3000;

app.use(passport.initialize());
app.use(passport.session());
require("./config/passport");

app.use("/static", express.static(path.join(__dirname, "public")));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      console.log("no user found");
      return res.json({ msg: info });
    }

    req.login(user, function (err) {
      if (err) {
        return next(err);
      }
      res.redirect("/");
    });
  })(req, res, next);
});

app.get("/signup", (req, res) => {
  res.render("signup");
});

app.post("/signup", async (req, res) => {
  // user 객체 생성
  const user = new User(req.body);

  // user 컬렉션에 유저 생성
  try {
    await user.save();
    return res.status(200).json({
      success: true,
    });
  } catch (error) {
    console.error(error);
  }
});

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("mongodb connect");
  })
  .catch((error) => console.error(error));

app.listen(port, () => {
  console.log("app start");
});
