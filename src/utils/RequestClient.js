import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://satcheltwo-api.abstractpoo.repl.co",
  json: true,
});

function callWrap(method, auth, args) {
  return axiosClient({
    method: method,
    headers: { authtoken: auth.currentUser.accessToken || "" },
    ...args,
  });
}

class Client {
  constructor(auth) {
    this.auth = auth;
  }

  get(auth, args) {
    return callWrap("get", auth, args);
  }

  post(auth, args) {
    return callWrap("post", auth, args);
  }
}

export const RequestClient = new Client();
