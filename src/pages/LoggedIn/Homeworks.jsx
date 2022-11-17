import {
  useGetApi,
  usePostApi,
  USER_CLASSES,
  HOMEWORK_CREATE,
  USER_HOMEWORKS,
} from "../../hooks/Api";
import { Routes, Route, useLocation, useParams } from "react-router-dom";
import { getDay, getDate, getMonth } from "../../utils/Time";
import { LoadingSpinner } from "../../components/Loading";

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
  const set = new Date(data.set);
  const due = new Date(data.due);

  const dueDay = getDay(due);
  const dueDate = getDate(due);
  const dueMonth = getMonth(due);
  const importance = getImportance(due);
  const importanceColor = homeworkImportanceColors[importance];
  const importanceDefinition = homeworkImportanceDefinitions[importance];
  return (
    <div
      key={data._id}
      className="w-[calc(24rem-20px)] h-24 bg-neutral-100 dark:bg-neutral-700 rounded flex shadow-md"
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
    </div>
  );
}

function Homeworks() {
  const homeworks = useGetApi(USER_HOMEWORKS);

  return (
    <>
      <div className="flex flex-row h-screen">
        <div
          className={
            "w-96 bg-gray-200 dark:bg-neutral-800" +
            (!homeworks ? " flex justify-center items-center" : "")
          }
        >
          {homeworks ? (
            <div className=" h-full flex flex-col items-center p-2.5 gap-2.5 ">
              {homeworks.map((data) => (
                <HomeworkButton key={data._id} data={data} />
              ))}
            </div>
          ) : (
            <LoadingSpinner size="8" />
          )}
        </div>

        <div>
          <Routes>
            <Route path="/:homeworkId" element={<HomeworkPage />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

function HomeworkPage() {
  const params = useParams();
  const location = useLocation();
  return (
    <div className="w-full">
      this is actually quite nice{JSON.stringify(params)}
    </div>
  );
}

export default Homeworks;
