import {
  HOMEWORK_COMPLETE,
  HOMEWORK_UNCOMPLETE,
  useGetApi,
  usePostApi,
  USER_HOMEWORKS,
} from "../../hooks/Api";
import { useState } from "react";
import { Routes, Route, useParams, Link } from "react-router-dom";
import { getDay, getDate, getMonth } from "../../utils/Time";
import { LoadingSpinner } from "../../components/Loading";
import { DateIcon, ArrowIcon, AttachmentIcon } from "../../components/Library";
import { useAuth } from "../../hooks/Auth";
import { useLocalStorage } from "usehooks-ts";
import { CrossIcon, TickIcon } from "../../components/Library";
//https://www.ditdot.hr/en/dark-mode-website-tutorial colour overrides

const homeworkImportanceColors = ["#D95F5F", "#ECA25E", "#75D066"];
const homeworkImportanceDefinitions = ["PAST DUE", "DUE TODAY", "UPCOMING"];

function getImportance(due) {
  const currentDate = new Date();
  return due.toDateString() === currentDate.toDateString()
    ? 1
    : due < currentDate
    ? 0
    : 2;
}

function HomeworkButton({ data }) {
  const due = new Date(data.due);
  const params = useParams();
  const homeworkId = params["*"];
  const { user } = useAuth();
  const { uid } = user;
  const completed = data?.usersCompleted?.find((user) => user.uid === uid);

  const dueDay = getDay(due);
  const dueDate = getDate(due);
  const dueMonth = getMonth(due);
  const importance = getImportance(due);
  const importanceColor = homeworkImportanceColors[importance];
  const importanceDefinition = homeworkImportanceDefinitions[importance];

  const completeHomework = usePostApi(HOMEWORK_COMPLETE);
  const uncompleteHomework = usePostApi(HOMEWORK_UNCOMPLETE);
  const [loading, setLoading] = useState(false);
  const [, setUpdate] = useState();

  function handleComplete() {
    (async function () {
      setLoading(true);
      const res = await completeHomework({ homeworkId: data._id });
      if (res.modifiedCount) {
        data.usersCompleted = [{ uid: uid }];
        setUpdate({});
      }
      setLoading(false);
    })();
  }

  function handleUncomplete() {
    (async function () {
      setLoading(true);
      const res = await uncompleteHomework({ homeworkId: data._id });
      if (res.modifiedCount) {
        data.usersCompleted = [];
        setUpdate({});
      }
      setLoading(false);
    })();
  }

  function handleToggleComplete() {
    if (completed) {
      handleUncomplete();
    } else {
      handleComplete();
    }
  }

  return (
    <div
      className={
        "h-24 bg-neutral-100 dark:bg-neutral-700 rounded flex shadow-md w-full justify-between min-w-0"
      }
    >
      <div className="flex flex-row min-w-0">
        <div
          className="h-full flex flex-col justify-around p-3 w-24 h-24 items-center rounded-tl rounded-bl flex-shrink-0"
          style={{ backgroundColor: importanceColor }}
        >
          <div className="text-sm text-white/75">{dueDay}</div>
          <div className="text-2xl text-white">{dueDate}</div>
          <div className="text-sm text-white/75">{dueMonth}</div>
        </div>
        <Link
          to={data._id === homeworkId ? "/" : data._id}
          className="p-3 flex flex-col justify-around block grow flex-shrink min-w-0"
        >
          <div
            className="font-bold text-xs min-w-0 w-full"
            style={{ color: importanceColor }}
          >
            {importanceDefinition}
          </div>
          <div className="font-semibold text-md truncate dark:text-white min-w-0 w-full">
            {data.title}
          </div>
          <div className="text-xs truncate dark:text-white/75 min-w-0 w-full">
            {data.description}
          </div>
          <div className="text-xs truncate text-neutral-500 min-w-0 w-full">
            {data.class}
          </div>
        </Link>
      </div>
      <div className="w-fit flex-shrink-0">
        <button
          className="rounded bg-gray-200 p-1 m-2.5 hover:bg-gray-300 transition flex"
          onClick={handleToggleComplete}
        >
          {loading ? (
            <LoadingSpinner size={3} />
          ) : (
            <>
              {completed ? (
                <TickIcon className="w-3 h-3" />
              ) : (
                <CrossIcon className="w-3 h-3" />
              )}
            </>
          )}
        </button>
      </div>
    </div>
  );
}

function Homeworks() {
  let homeworks = useGetApi(USER_HOMEWORKS);
  const params = useParams();
  const homeworkId = params["*"];
  const [showCompleted, setShowCompleted] = useLocalStorage(
    "showCompleted",
    true
  );
  const { user } = useAuth();
  const { uid } = user;

  function filterHomeworks(homework) {
    let completed = false;
    homework?.usersCompleted.forEach((user) => {
      if (user.uid === uid) {
        completed = true;
      }
    });
    return !completed;
  }

  let filteredHomeworks = homeworks;
  if (!showCompleted && homeworks) {
    filteredHomeworks = homeworks?.filter(filterHomeworks);
  }

  function handleShowCompleteHomework() {
    setShowCompleted((prev) => !prev);
  }

  return (
    <>
      <div className="flex flex-row h-screen w-full">
        {homeworks ? (
          <>
            <div
              className={
                "bg-gray-200 dark:bg-neutral-800 flex flex-col items-center" +
                (!homeworkId ? " w-full" : " w-96")
              }
            >
              <button
                className="bg-neutral-100 mt-2.5 dark:bg-neutral-700 rounded flex shadow-md text-black/75 dark:text-white/75 p-2.5"
                onClick={handleShowCompleteHomework}
              >
                <span
                  className={
                    showCompleted ? "text-[#D95F5F]" : "text-[#75D066]"
                  }
                >
                  {showCompleted ? "hide" : "show"}
                </span>
                &nbsp;completed homeworks
              </button>
              <div className="h-full flex flex-col items-center p-2.5 gap-2.5 w-full max-w-screen-md">
                {filteredHomeworks.map((data) => (
                  <HomeworkButton key={data._id} data={data} />
                ))}
              </div>
            </div>

            {homeworkId ? (
              <div className="w-full h-full dark:bg-neutral-700">
                <Routes>
                  <Route
                    path="/:homeworkId"
                    element={<HomeworkPage homeworks={homeworks} />}
                  />
                </Routes>
              </div>
            ) : (
              <></>
            )}
          </>
        ) : (
          <div className="flex flex-row bg-gray-200 dark:bg-neutral-800 h-full w-full items-center justify-center">
            <LoadingSpinner size="8" />
          </div>
        )}
      </div>
    </>
  );
}

function HomeworkPageLayout({ homework }) {
  const { title, description, due, set, resources, teacherName, teacherPhoto } =
    homework;
  const importance = getImportance(new Date(due));
  const importanceColor = homeworkImportanceColors[importance];
  return (
    <div className="w-full p-2.5">
      <div className="flex flex-col p-12">
        <div className="flex flex-col gap-5">
          <div className="flex flex-row justify-between items-center gap-2.5">
            <div className="text-4xl text-neutal-900 dark:text-neutral-100">
              {title}
            </div>
            <div className="flex flex-row gap-2.5 items-center">
              <div className="text-xl text-neutral-700 dark:text-neutral-200">
                {teacherName}
              </div>
              <img
                src={teacherPhoto}
                alt={teacherName}
                className="w-8 h-8 rounded-full"
              />
            </div>
          </div>
          <div className="flex flex-row gap-2.5">
            <DateIcon className="text-neutral-800 dark:text-neutral-200" />
            <div className="text-neutral-800 dark:text-neutral-200">
              {new Date(set).toGMTString().substring(0, 16)}
            </div>
            <ArrowIcon color={importanceColor} />
            <div className="text-neutral-800 dark:text-neutral-200">
              {new Date(due).toGMTString().substring(0, 16)}
            </div>
          </div>
          <div className="flex flex-col gap-2.5">
            <div className="text-2xl text-neutral-800 dark:text-neutral-200">
              Description
            </div>
            <div className="text-neutral-700 dark:text-neutral-300 text-lg">
              {description}
            </div>
          </div>
          <div className="flex flex-row gap-2.5">
            {resources?.map((resource) => {
              return (
                <a
                  href={resource.link}
                  className="flex flex-row bg-gray-200 dark:bg-neutral-800 p-2.5 gap-2.5 rounded items-center"
                  target="_blank"
                  rel="noreferrer"
                  key={resource.name}
                >
                  <AttachmentIcon className="text-neutral-800 dark:text-neutral-200" />
                  <div className="text-neutral-800 dark:text-neutral-200 text-sm">
                    {resource.name}
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function HomeworkPage({ homeworks }) {
  const { homeworkId } = useParams();
  const homework = homeworks?.find((item) => item._id === homeworkId);
  // min width magically vanishing
  return (
    <div className=" w-full">
      {homework ? (
        <HomeworkPageLayout homework={homework} />
      ) : (
        <>You do not have access to this homework</>
      )}
    </div>
  );
}

export default Homeworks;
