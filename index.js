const http = require("http");

const port = 3000;

const server = http.createServer((req, res) => {
  // writeHead는 한 번만 호출되어야 함 end()가 호출되기 전에 호출되어야 함
  // 상태 코드는 응답 헤더를 클라이언트에 보냄
  res.writeHead(200, {
    "Content-Type": "text/plain",
  });
  // 데이터가 로드되었음을 서버에 알림
  res.end("Hello");
});

server.listen(port, () => {
  console.log("server start");
});
