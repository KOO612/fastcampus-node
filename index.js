const http = require("http");

const port = 3000;

/*

const server = http.createServer((req, res) => {
  // writeHead는 한 번만 호출되어야 함 end()가 호출되기 전에 호출되어야 함
  // 상태 코드는 응답 헤더를 클라이언트에 보냄
  res.writeHead(200, {
    // content-type 응답 데이터의 형식을 알려줌
    // "Content-Type": "text/plain",
    // "Content-Type": "application/json",
    "Content-Type": "text/html",
  });
  // 데이터가 로드되었음을 서버에 알림
  res.end("<h1>hello</h1>");
});ßß
*/
const dataObject = { a: "a", b: "b" };
const server = http.createServer((req, res) => {
  if (req.method === "POST" && req.url === "/home") {
    req.on("data", (data) => {
      console.log("data", data);
      const stringfiedData = data.toString();
      console.log("stringfiedData", stringfiedData);
      Object.assign(dataObject, JSON.parse(stringfiedData));
    });
  } else {
    if (req.url == "/home") {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.end(
        JSON.stringify({
          a: "a",
          b: "b",
        })
      );
    } else if (req.url == "/about") {
      res.setHeader("Content-Type", "text/html");
      res.write("<html>");
      res.write("<body>");
      res.write("<h1>hello</h1>");
      res.write("</body>");
      res.write("</html>");
      res.end();
    } else {
      res.statusCode = 404;
      res.end();
    }
  }
});
server.listen(port, () => {
  console.log("server start");
});
