const model = require("../models/users.model");

exports.getUsers = function (req, res) {
  res.json(model);
};

exports.getUser = function (req, res) {
  const userId = Number(req.params.userId);
  const user = model(userId);

  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).json({ error: "No User Found" });
  }
};

exports.postUser = function (req, res) {
  if (!req.body.name) {
    return res.status(400).json({
      error: "Missing user name",
    });
  }

  const newUser = {
    name: req.body.name,
    id: users.length,
  };
  model.push(newUser);

  res.json(newUser);
};
