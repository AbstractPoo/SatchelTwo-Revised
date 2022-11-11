import axios from "axios";
import { getIdToken } from "firebase/auth";

const axiosClient = axios.create({
  baseURL: "https://satcheltwo-api.abstractpoo.repl.co",
  json: true,
});

async function callWrap(method, auth, args) {
  return axiosClient({
    method: method,
    headers: { authtoken: (await getIdToken(auth.currentUser)) || "" },
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
