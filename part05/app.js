const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const port = 3000;

const secretText = "secret";

const posts = [
  {
    username: "john",
    title: "post 1",
  },
  {
    username: "koo",
    title: "post 2",
  },
];

app.use(express.json());

app.post("/login", (req, res) => {
  const username = req.body.username;
  const user = { name: username };

  // 토큰 생성
  const acceseToken = jwt.sign(user, secretText);
  res.json({ acceseToken: acceseToken });
});

app.get("/posts", authMiddleware, (req, res) => {
  res.json(posts.filter((post) => post.username === req.user.name));
});

function authMiddleware(req, res, next) {
  // 토큰을 request headers에서 가져오기
  const authHeader = req.headers["authorization"];

  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    return res.sendStatus(401);
  }

  // 토큰 유효한 토큰인지 검증
  jwt.verify(token, secretText, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }
    req.user = user;
    next();
  });
}

app.listen(port, () => {
  console.log("app start");
});
