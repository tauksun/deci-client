// TODO: Stateful incremental parser in case of partial message received
// TODO: Stateful incremental parser in case of partial message received
// TODO: Stateful incremental parser in case of partial message received

/**
 * Decodes :
 *      string ($)
 *      integer (:)
 *      null (_)
 *      error (-)
 * */

interface DecodedResponse {
  error: {
    partial: boolean;
    invalid: boolean;
    logic: boolean;
  },

  data?: string | number | null;
}


const extractLength = (offset: { current: number }, str: string) => {
  let oplen = "";
  const len = str.length;
  for (let i = offset.current; str[i] != '\r'; i++) {
    if (len < offset.current + 1) {
      return -1;
    }
    oplen += str[i];
    offset.current++;
  }

  // Increment offset to the pos after the limiters
  offset.current += 2;
  return +oplen;
}

const decoder = (response: string): DecodedResponse => {
  const decodedResponse: DecodedResponse = {
    error: {
      partial: false,
      invalid: false,
      logic: false
    },
    data: null
  };

  if (response.length < 2) {
    decodedResponse.error.partial = true;
    return decodedResponse;
  }

  const type = response[0];
  const offset = {
    current: 1
  };

  // $3\r\nyup\r\n
  if (type == '$') {
    const strlen = extractLength(offset, response);

    if (strlen == -1 ||
      response.length < offset.current + strlen + 1) { // +1 for delimiter
      decodedResponse.error.partial = true;
      return decodedResponse;
    }

    decodedResponse.data = response.substring(offset.current, strlen);
    return decodedResponse;

  }
  // :1234\r\n
  else if (type == ':') {
    const len = extractLength(offset, response);
    if (len == -1 || response.length < offset.current) {
      decodedResponse.error.partial = true;
      return decodedResponse;
    }

    decodedResponse.data = len;
    return decodedResponse;
  }
  // _\r\n
  else if (type == '_') {
    if (response.length < 3) {
      decodedResponse.error.partial = true;
      return decodedResponse;
    }

    decodedResponse.data = null;
    return decodedResponse;
  }
  // -Invalid Message\r\n
  else if (type == '-') {
    const len = response.length;
    while (offset.current < len && response[offset.current] != '\r') {
      offset.current++;
    }

    if (response[offset.current] != '\r') {
      decodedResponse.error.partial = true;
      return decodedResponse;
    }

    decodedResponse.error.logic = true;
    decodedResponse.data = response.substring(1, offset.current);

    return decodedResponse;
  } else {
    decodedResponse.error.invalid = true;
    return decodedResponse;
  }
}

export { decoder };
