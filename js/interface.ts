// Local Cache 

interface GET {
  key: string;
};


interface SET {
  key: string;
  value: string;
  sync?: number;
};

interface DEL {
  key: string;
  sync?: number;
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

export {
  GET, SET, DEL, EXISTS, GGET, GSET, GDEL, GEXISTS,
  NUMERICAL_RESPONSE, DATA_RESPONSE
}
