// TODO: Maintain pool strength on connection loss
// TODO: Maintain pool strength on connection loss
// TODO: Maintain pool strength on connection loss

import net from "node:net";

const pool: net.Socket[] = [];

const initiatePool = (socket: string, numberOfConnections: number) => {
  for (let i = 0; i < numberOfConnections; i++) {
    const conn = net.createConnection(socket);
    pool.push(conn);
  }
}

const fetchConnection = () => {
  return pool.shift();
}

const addConnection = (conn: net.Socket) => {
  pool.push(conn);
}

export { initiatePool, fetchConnection, addConnection };

