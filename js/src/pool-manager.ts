// TODO: Maintain pool strength on connection loss
// TODO: Maintain pool strength on connection loss
// TODO: Maintain pool strength on connection loss

import net from "node:net";
import { EventEmitter } from "node:events";

const pool: net.Socket[] = [];
const connEvent = new EventEmitter();

const initiatePool = (socket: string, numberOfConnections: number) => {
  for (let i = 0; i < numberOfConnections; i++) {
    const conn = net.createConnection(socket);
    conn.on("ready", () => {
      console.log("connection ready");
      pool.push(conn);
      connEvent.emit("add");
    });
    ;
  }
}

const returnConnPromise = (): Promise<net.Socket> => {
  return new Promise((resolve) => {
    const tryGetConn = () => {
      if (pool.length) {
        const conn = pool.shift()!;
        connEvent.removeListener("add", tryGetConn);
        resolve(conn);
      }
    };
    connEvent.on("add", tryGetConn);
  });
}

const fetchConnection = async (): Promise<net.Socket> => {
  if (pool.length) {
    const conn = pool.shift();
    if (conn) {
      return conn;
    }
  }
  // No connection available in pool
  return returnConnPromise();
}

const addConnection = (conn: net.Socket) => {
  pool.push(conn);
  connEvent.emit("add");
}

export { initiatePool, fetchConnection, addConnection };
