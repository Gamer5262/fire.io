import { Client, Room } from 'colyseus.js';

let client: Client | null = null;
let room: Room | null = null;

export async function connectToServer(serverUrl = 'ws://localhost:2567') {
  client = new Client(serverUrl);
  return client;
}

export async function joinRoom(roomName: string, options: any = {}) {
  if (!client) throw new Error('Not connected to server');
  room = await client.joinOrCreate(roomName, options);
  return room;
}

export function getRoom() {
  return room;
}
