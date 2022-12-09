import { useState } from "react";
import {
  useGetApi,
  usePostApi,
  ALL_CLASSES,
  CLASS_JOIN,
  CLASS_LEAVE,
  USER_HOMEWORKS,
} from "../../hooks/Api";
import { useAuth } from "../../hooks/Auth";
import { LoadingSpinner } from "../../components/Loading";

function SubscriptionItem({ data }) {
  const joinClass = usePostApi(CLASS_JOIN, [USER_HOMEWORKS]);
  const leaveClass = usePostApi(CLASS_LEAVE, [USER_HOMEWORKS]);
  const { user } = useAuth();
  const joined = data?.users?.find((item) => item.uid === user.uid);
  const [update, setUpdate] = useState();
  const [loading, setLoading] = useState(false);

  //possibly useeffect with some states on the functions below to get loading buttons working

  function handleJoinClass() {
    (async function () {
      setLoading(true);
      const res = await joinClass({ _id: data._id });
      if (res.modifiedCount) {
        data.users = [{ uid: user.uid }];
        setUpdate({});
      }
      setLoading(false);
    })();
  }
  function handleLeaveClass() {
    (async function () {
      setLoading(true);
      const res = await leaveClass({ _id: data._id });
      if (res.modifiedCount) {
        data.users = [];
        setUpdate({});
      }
      setLoading(false);
    })();
  }
  return (
    <div className="h-24 bg-neutral-100 dark:bg-neutral-700 rounded flex shadow-md">
      <div>{data.name}</div>
      <button onClick={joined ? handleLeaveClass : handleJoinClass}>
        {loading ? <LoadingSpinner size={6} /> : joined ? "leave" : "join"}
      </button>
    </div>
  );
}

function Subscriptions() {
  const allClasses = useGetApi(ALL_CLASSES);
  return (
    <>
      <div className="w-full h-full bg-gray-200 flex flex-col items-center dark:bg-neutral-800">
        {allClasses?.map((cl) => (
          <SubscriptionItem key={cl._id} data={cl} />
        ))}
      </div>
    </>
  );
}

export default Subscriptions;
