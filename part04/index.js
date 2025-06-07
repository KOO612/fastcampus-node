const express = require("express");
const path = require("path");
const port = 3000;

const usersRouter = require("./routes/users.router");
const postsRouter = require("./routes/posts.router");

const app = express();

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

app.use("/static", express.static(path.join(__dirname, "public")));
app.use(express.json());

app.use((req, res, next) => {
  const start = Date.now();
  console.log(`${req.method}, ${req.url}`);
  next();
  const diffTime = Date.now() - start;
  console.log(`${req.method}, ${req.baseUrl}${req.url}, ${diffTime}`);
});

app.get("/", (req, res) => {
  res.render("index", {
    imageTitle: "forest title",
  });
});

app.use("/users", usersRouter);
app.use("/posts", postsRouter);

app.listen(port, () => {
  console.log("server start");
});
