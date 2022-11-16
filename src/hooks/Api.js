import { useAuth } from "./Auth";
import { RequestClient } from "../utils/RequestClient";
import { useState, useEffect } from "react";

export const USER_DATA = "/user/get";
export const USER_HOMEWORKS = "/homework/get";
export const USER_CLASSES = "/class/getalluser";

export const CLASS_CREATE = "/class/create";
export const HOMEWORK_CREATE = "/homework/create";

const responseCache = {};

export function useGetApi(route, forceRefresh) {
  const { auth } = useAuth();
  const [response, setResponse] = useState();

  useEffect(() => {
    (async function () {
      if (auth && auth?.currentUser) {
        if (responseCache[route] && !forceRefresh) {
          setResponse(responseCache[route]);
        } else {
          if (auth?.currentUser) {
            const res = await RequestClient.get(auth, { url: route });
            responseCache[route] = res.data;
            setResponse(res.data);
          }
        }
      }
    })();
  }, [auth?.currentUser]);

  return response;
}

export function usePostApi(route) {
  const { auth } = useAuth();

  async function tempApiFunc(data) {
    const res = await RequestClient.post(auth, { url: route, data: data });
    return res;
  }

  return tempApiFunc;
}
