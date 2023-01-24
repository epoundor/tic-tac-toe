import io from "socket.io-client";
const socket = io("http://192.168.100.239:3000");

// client-side
socket.on("connect", () => {
  console.log(socket.id); // x8WIv7-mJelg7on_ALbx
});
socket.on("hello", () => {
  console.log(socket.id, "hello"); // x8WIv7-mJelg7on_ALbx
});

socket.on("disconnect", () => {
  console.log(socket.id); // undefined
});

export { socket };
