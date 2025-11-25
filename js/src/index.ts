import {
  CONNECT, GET, SET, DEL, EXISTS, GGET, GSET, GDEL,
  GEXISTS, NUMERICAL_RESPONSE, DATA_RESPONSE
} from "./interface";
import { fetchConnection, initiatePool } from "./pool-manager";
import { encoder } from "./query-encoder";
import { decoder } from "./response-decoder";
import { addConnection } from "./pool-manager";

const writeToLCPAndDecodeResponse = async (query: string,
  resolve: (value: any) => void,
  reject: (reason: unknown) => void) => {

  const conn = await fetchConnection();
  conn.write(query);

  let response = "";

  conn.on("data", (data) => {
    response += data.toString();
  });

  conn.on("end", () => {
    // Decode Response
    const decodedResponse = decoder(response);
    if (decodedResponse.error.logic) {
      reject(decodedResponse.data);
    }

    addConnection(conn);

    if (decodedResponse.error.invalid) {
      reject("Invalid response from Deci");
    }

    resolve({
      data: decodedResponse.data
    });
  });
}

const deci = {
  /**
    * @description 
    * socket : UNIX Socket Path
    * pool : Number of connections in pool
    * */
  connect: ({ socket, pool }: CONNECT) => {
    initiatePool(socket, pool);
  },
  /**
    * @description
    * Fetch value of key from Local Cache
    **/
  get: ({ key }: GET): Promise<DATA_RESPONSE> => {
    return new Promise(async (resolve, reject) => {
      // Construct Query
      const queryParams = [key];
      const query = encoder(queryParams);

      // Send to LCP & Decode
      return writeToLCPAndDecodeResponse(query, resolve, reject,);
    });
  },
  /**
    * @description
    * Set value of key in Local Cache
    **/
  set: async ({ key, value, sync = true }: SET): Promise<NUMERICAL_RESPONSE> => {
    return new Promise(async (resolve, reject) => {
      // Construct Query
      const timestamp = new Date().getTime();
      const queryParams = [key, value, timestamp.toString(), sync ? 1 : 0];
      const query = encoder(queryParams);

      // Send to LCP & Decode
      return writeToLCPAndDecodeResponse(query, resolve, reject,);
    });
  },
  /**
    * @description
    * Delete value of key in Local Cache
    **/
  del: async ({ key, sync = true }: DEL): Promise<NUMERICAL_RESPONSE> => {
    return new Promise(async (resolve, reject) => {
      // Construct Query
      const timestamp = new Date().getTime();
      const queryParams = [key, timestamp.toString(), sync ? 1 : 0];
      const query = encoder(queryParams);

      // Send to LCP & Decode
      return writeToLCPAndDecodeResponse(query, resolve, reject,);
    });
  },
  /**
    * @description
    * Check if the key exists in Local Cache
    **/
  exists: async ({ key }: EXISTS): Promise<NUMERICAL_RESPONSE> => {
    return new Promise(async (resolve, reject) => {
      // Construct Query
      const queryParams = [key];
      const query = encoder(queryParams);

      // Send to LCP & Decode
      return writeToLCPAndDecodeResponse(query, resolve, reject,);
    });
  },
  /**
    * @description
    * Get the value of key from Global Cache
    **/
  gget: async ({ key }: GGET): Promise<DATA_RESPONSE> => {
    return new Promise(async (resolve, reject) => {
      // Construct Query
      const queryParams = [key];
      const query = encoder(queryParams);

      // Send to LCP & Decode
      return writeToLCPAndDecodeResponse(query, resolve, reject,);
    });
  },
  /**
    * @description
    * Set the value of key in Global Cache
    **/
  gset: async ({ key, value }: GSET): Promise<NUMERICAL_RESPONSE> => {
    return new Promise(async (resolve, reject) => {
      // Construct Query
      const queryParams = [key, value];
      const query = encoder(queryParams);

      // Send to LCP & Decode
      return writeToLCPAndDecodeResponse(query, resolve, reject,);
    });
  },
  /**
    * @description
    * Delete the value of key in Global Cache
    **/
  gdel: async ({ key }: GDEL): Promise<NUMERICAL_RESPONSE> => {
    return new Promise(async (resolve, reject) => {
      // Construct Query
      const queryParams = [key];
      const query = encoder(queryParams);

      // Send to LCP & Decode
      return writeToLCPAndDecodeResponse(query, resolve, reject,);
    });
  },
  /**
    * @description
    * Check if the key exists in Global Cache
    **/
  gexists: async ({ key }: GEXISTS): Promise<NUMERICAL_RESPONSE> => {
    return new Promise(async (resolve, reject) => {
      // Construct Query
      const queryParams = [key];
      const query = encoder(queryParams);

      // Send to LCP & Decode
      return writeToLCPAndDecodeResponse(query, resolve, reject,);
    });
  },
};


export default {
  deci,
};
