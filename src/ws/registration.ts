import { players } from "./playersDB";
import { PlayerData } from "./types";
import { WebSocket } from "ws";

export function register(ws: WebSocket, data: PlayerData) {
  const { name, password } = data;
  
  let error = false;
  let errorText = "";

  if (players.has(name)) {
    const player = players.get(name);

    if (player.password !== password) {
      error = true;
      errorText = "Incorrect password";
    }
  } else {
    players.set(name, {
      name,
      password,
    });
  }

ws.send(JSON.stringify({
  type: "reg",
 data: JSON.stringify({
    name,
    index: name,
    error,
    errorText
  }),
  id: 0
}));
}

