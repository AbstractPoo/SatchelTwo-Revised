import { useGetApi, USER_HOMEWORKS } from "../../hooks/Api";
import { Routes, Route, useParams, Link } from "react-router-dom";
import { getDay, getDate, getMonth } from "../../utils/Time";
import { LoadingSpinner } from "../../components/Loading";
import { DateIcon, ArrowIcon, AttachmentIcon } from "../../components/Library";

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

  const dueDay = getDay(due);
  const dueDate = getDate(due);
  const dueMonth = getMonth(due);
  const importance = getImportance(due);
  const importanceColor = homeworkImportanceColors[importance];
  const importanceDefinition = homeworkImportanceDefinitions[importance];
  return (
    <Link
      key={data._id}
      className={
        "h-24 bg-neutral-100 dark:bg-neutral-700 rounded flex shadow-md" +
        (homeworkId ? " w-[calc(24rem-20px)]" : " w-full max-w-4 xl")
      }
      to={data._id === homeworkId ? "/" : data._id}
    >
      <div
        className="w-24 h-full flex flex-col justify-around p-3 items-center rounded-tl rounded-bl"
        style={{ backgroundColor: importanceColor }}
      >
        <div className="text-sm text-white/75">{dueDay}</div>
        <div className="text-2xl text-white">{dueDate}</div>
        <div className="text-sm text-white/75">{dueMonth}</div>
      </div>
      <div className="p-3 flex flex-col justify-around">
        <div className="font-bold text-xs" style={{ color: importanceColor }}>
          {importanceDefinition}
        </div>
        <div className="font-semibold w-[180px] text-md truncate dark:text-white">
          {data.title}
        </div>
        <div className="text-xs w-[180px] truncate dark:text-white/75">
          {data.description}
        </div>
        <div className="text-xs text-neutral-500">{data.class}</div>
      </div>
    </Link>
  );
}

function Homeworks() {
  const homeworks = useGetApi(USER_HOMEWORKS);
  const params = useParams();
  const homeworkId = params["*"];
  return (
    <>
      <div className="flex flex-row h-screen w-full">
        {homeworks ? (
          <>
            <div
              className={
                "bg-gray-200 dark:bg-neutral-800" +
                (!homeworkId ? " w-full" : " w-96")
              }
            >
              <div className="h-full flex flex-col items-center p-2.5 gap-2.5">
                {homeworks.map((data) => (
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
  const { title, description, due, set, resources } = homework;
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
            <div className="dark:text-white">
              {"teacher's name in the future"}
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
  return (
    <div className="w-full">
      {homework ? (
        <HomeworkPageLayout homework={homework} />
      ) : (
        <>You do not have access to this homework</>
      )}
    </div>
  );
}

export default Homeworks;
