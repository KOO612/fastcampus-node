const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const port = 3000;
const cookieParser = require("cookie-parser");

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

let refreshTokens = [];

app.use(express.json());
app.use(cookieParser());

app.post("/login", (req, res) => {
  const username = req.body.username;
  const user = { name: username };

  // 토큰 생성
  // 유효기간 추가
  const accesseToken = jwt.sign(user, secretText, { expiresIn: "30s" });

  // refreshToken 생성
  const refreshToken = jwt.sign(user, "refresh", { expiresIn: "1d" });

  refreshTokens.push(refreshToken);

  res.cookie("jwt", refreshToken, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
  });

  res.json({ accesseToken: accesseToken });
});

// refresh 토큰 검증
app.get("/refresh", (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) {
    return res.sendStatus(401);
  }

  const refreshToken = cookies.jwt;
  if (!refreshTokens.includes(refreshToken)) {
    return res.sendStatus(403);
  }

  jwt.verify(refreshToken, "refresh", (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }
    const accesseToken = jwt.sign({ name: user.name }, secretText, { expiresIn: "30s" });
    res.json({ accesseToken });
  });
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
