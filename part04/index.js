const express = require("express");
const port = 3000;

const usersRouter = require("./routes/users.router");
const postsRouter = require("./routes/posts.router");

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  const start = Date.now();
  console.log(`${req.method}, ${req.url}`);
  next();
  const diffTime = Date.now() - start;
  console.log(`${req.method}, ${req.baseUrl}${req.url}, ${diffTime}`);
});

app.get("/", (req, res) => {
  res.send("hello world");
});

app.use("/users", usersRouter);
app.use("/posts", postsRouter);

app.listen(port, () => {
  console.log("server start");
});
