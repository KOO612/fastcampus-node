const socket = io("ws://localhost:3000");

socket.on("message", (text) => {
  const el = document.createElement("li");
  el.innerHTML = text;
  document.querySelector("ul").appendChild(el);
});

document.querySelector("button").onclick = (e) => {
  const text = document.querySelector("input").value;

  socket.emit("message", text);
};
