import axios from "axios";
import { getIdToken } from "firebase/auth";

const axiosClient = axios.create({
  baseURL: "https://satcheltwo-api.abstractpoo.repl.co",
  json: true,
});

async function request(method, auth, args) {
  return axiosClient({
    method: method,
    headers: { authtoken: (await getIdToken(auth.currentUser)) || "" },
    ...args,
  });
}

class Client {
  get(auth, args) {
    return request("get", auth, args);
  }

  post(auth, args) {
    return request("post", auth, args);
  }
}

export const RequestClient = new Client();
