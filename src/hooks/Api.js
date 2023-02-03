import { useAuth } from "./Auth";
import { RequestClient } from "../utils/RequestClient";
import { useState, useEffect } from "react";

export const USER_DATA = "/user/get";
export const USER_HOMEWORKS = "/homework/get";
export const USER_CLASSES = "/class/getalluser";
export const ALL_CLASSES = "/class/getall";
export const CREATOR_CLASSES = "/class/getallcreator";
export const CREATOR_HOMEWORKS = "/homework/getallcreator";

export const CLASS_LEAVE = "/class/leave";
export const CLASS_CREATE = "/class/create";
export const CLASS_JOIN = "/class/join";
export const HOMEWORK_CREATE = "/homework/create";
export const HOMEWORK_REMOVE = "/homework/remove";
export const HOMEWORK_COMPLETE = "/homework/complete";
export const HOMEWORK_UNCOMPLETE = "/homework/uncomplete";

const responseCache = {};
const toBeRefreshed = {};

export function useGetApi(route) {
  const { auth } = useAuth();
  const [response, setResponse] = useState();

  useEffect(() => {
    (async function () {
      if (auth && auth?.currentUser) {
        if (responseCache[route] && !toBeRefreshed[route]?.state) {
          setResponse(responseCache[route]);
        } else {
          const res = await RequestClient.get(auth, { url: route });
          responseCache[route] = res.data;
          toBeRefreshed[route] = { state: false };
          setResponse(res.data);
        }
      }
    })();
  }, [auth?.currentUser, toBeRefreshed[route]]);

  return response;
}

export function usePostApi(route, forceRefreshes) {
  const { auth } = useAuth();
  async function tempApiFunc(data) {
    const res = await RequestClient.post(auth, { url: route, data: data });
    forceRefreshes?.forEach((refresh) => {
      toBeRefreshed[refresh] = { state: true };
    });
    return res.data;
  }

  return tempApiFunc;
}
