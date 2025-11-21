import { WebSocketServer } from "ws";
import { register } from "./registration";

const PORT = 3000;

export const wss = new WebSocketServer({ port: PORT }, () => {
  console.log(`WebSocket server running at ws://localhost:${PORT}`);
});

wss.on("connection", (ws) => {
  console.log("Client connected");

 ws.on("message", (message) => {
    let msg;
    try {
      msg = JSON.parse(message.toString());

    } catch {
      console.log("Invalid JSON received");
      return;
    }

    if (msg.type === "reg") {
      register(ws, msg.data);
    }
  });

  ws.on("close", () => {
    console.log("Client disconnected");
  });
});
