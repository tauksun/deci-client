// Local Cache 

interface GET {
  key: string;
};


interface SET {
  key: string;
  value: string;
  sync?: boolean;
};

interface DEL {
  key: string;
  sync?: boolean;
};

interface EXISTS {
  key: string;
};


// Global Cache 

interface GGET {
  key: string;
};


interface GSET {
  key: string;
  value: string;
};

interface GDEL {
  key: string;
};

interface GEXISTS {
  key: string;
};

// Response
interface NUMERICAL_RESPONSE {
  data: number;
};

interface DATA_RESPONSE {
  data: string | null;
};

interface DECODED_RESPONSE {
  error: {
    partial: boolean;
    invalid: boolean;
    logic: boolean;
  },

  data?: string | number | null;
}

export {
  GET, SET, DEL, EXISTS, GGET, GSET, GDEL, GEXISTS,
  NUMERICAL_RESPONSE, DATA_RESPONSE, DECODED_RESPONSE
}
