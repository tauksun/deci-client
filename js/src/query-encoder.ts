const delimiter = "\r\n";
const _encoder = (val: string | number) => {
  let msg = "";

  if (typeof val == "string") {
    msg = "$" + val.length + delimiter + val + delimiter;
  } else if (typeof val == "number") {
    msg = ":" + val + delimiter;
  }
  // Future encoders here

  return msg;
}

const encoder = (params: (string | number)[]) => {
  let query = "";

  const arraySize = params.length;
  query += "*" + arraySize + delimiter;
  for (let i = 0; i < arraySize; i++) {
    query += _encoder(params[i]);
  }

  return query;
}


export { encoder };
