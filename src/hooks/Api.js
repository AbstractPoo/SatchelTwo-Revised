import { useAuth } from "./Auth";
import { RequestClient } from "../utils/RequestClient";
import { useState, useEffect } from "react";

export const USER_HOMEWORKS = "/homework/get";
export const USER_CLASSES = "/class/getalluser";

export const CREATE_CLASS = "/class/create";

export function useGetApi(route) {
  const { auth } = useAuth();
  const [response, setReponse] = useState();

  useEffect(() => {
    (async function () {
      const res = await RequestClient.get(auth, { url: route });
      setReponse(res.data);
    })();
  }, [auth?.currentUser]);

  return response;
}

export function usePostApi(route, body) {
  const { auth } = useAuth();
  const [response, setResponse] = useState();

  useEffect(() => {
    (async function () {
      const res = await RequestClient.post(auth, { url: route, data: body });
      setResponse(res.data);
    })();
  }, [auth?.currentUser]);

  return response;
}
