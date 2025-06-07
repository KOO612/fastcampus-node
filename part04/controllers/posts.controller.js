const path = require("path");

exports.getPost = function (req, res) {
  // res.send("<div><h1>hello</h1><p>this posts</p></div>");
  // res.sendFile(path.join(__dirname, "../public/images/forest.jpg"));
  // res.sendFile(path.join(__dirname, "..", "public", "images", "forest.jpg"));
  res.render("posts", {
    templateName: "post",
  });
};
