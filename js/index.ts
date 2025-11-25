import {
  GET, SET, DEL, EXISTS, GGET, GSET, GDEL, GEXISTS, NUMERICAL_RESPONSE, DATA_RESPONSE
} from "./interface";
import { encoder } from "./query-encoder";
import { decoder } from "./response-decoder";

const deci = {
  get: async (params: GET): Promise<DATA_RESPONSE> => {
    // Construct Query
    const queryParams = [params.key];
    const query = encoder(queryParams);

    // Send to LCP

    // Decode Response

    return {
      data: null
    };
  },
  set: async (params: SET): Promise<NUMERICAL_RESPONSE> => {
    const queryParams = [params.key];
    return {
      data: 0
    };
  },
  del: async (params: DEL): Promise<NUMERICAL_RESPONSE> => {
    const queryParams = [params.key];
    return {
      data: 0
    };
  },
  exists: async (params: EXISTS): Promise<NUMERICAL_RESPONSE> => {
    const queryParams = [params.key];
    return {
      data: 0
    };
  },
  gget: async (params: GGET): Promise<DATA_RESPONSE> => {
    const queryParams = [params.key];
    return {
      data: null
    };
  },
  gset: async (params: GSET): Promise<NUMERICAL_RESPONSE> => {
    const queryParams = [params.key];
    return {
      data: 0
    };
  },
  gdel: async (params: GDEL): Promise<NUMERICAL_RESPONSE> => {
    const queryParams = [params.key];
    return {
      data: 0
    };
  },
  gexists: async (params: GEXISTS): Promise<NUMERICAL_RESPONSE> => {
    const queryParams = [params.key];
    return {
      data: 0
    };
  },
};


export default deci;
