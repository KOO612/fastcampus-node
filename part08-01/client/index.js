const ws = new WebSocket("ws://localhost:7071/ws");

ws.onmessage = (webSocketMessage) => {
  console.log(webSocketMessage);
  console.log(webSocketMessage.data);
};

document.body.onmousemove = (evt) => {
  const messageBody = {
    x: evt.clientX,
    y: evt.clientY,
  };
  ws.send(JSON.stringify(messageBody));
};
