const express = require("express");
const port = 3000;

const app = express();

const users = [
  {
    id: 1,
    name: "Jack",
  },
  {
    id: 2,
    name: "kim",
  },
];

app.use(express.json());

app.use((req, res, next) => {
  const start = Date.now();
  console.log(`${req.method}, ${req.url}`);
  next();
  const diffTime = Date.now() - start;
  console.log(`${req.method}, ${req.url}, ${diffTime}`);
});

app.get("/", (req, res) => {
  res.send("hello world");
});

app.get("/users", (req, res) => {
  res.json(users);
});

app.get("/users/:userId", (req, res) => {
  // params가 string으로 들어오는 경우를 대비해 Number로 변환
  const userId = Number(req.params.userId);
  // const user = users[userId];
  const user = users.find((user) => user.id === userId);
  console.log(userId, "userId");
  if (user) {
    res.json(user);
  } else {
    res.sendStatus(404);
  }
});

app.post("/users", (req, res) => {
  if (!req.body.name) {
    // 다음 코드가 실행되지 않도록 return을 넣어 에러 출력 후 끊어줌
    return res.status(400).json({
      error: "Missing user name",
    });
  }
  const newUser = {
    name: req.body.name,
    id: users.length,
  };
  users.push(newUser);
  res.json(newUser);
});

app.listen(port, () => {
  console.log("server start");
});
