import { useGetApi, USER_CLASSES } from "../../hooks/Api";
import { Routes, Route, useLocation } from "react-router-dom";
import { getDay, getDate, getMonth } from "../../utils/Time";

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
      className="w-[calc(24rem-20px)] h-24 bg-neutral-100 rounded flex shadow-md"
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
        <div className="font-semibold w-[180px] text-lg truncate">
          {data.title}
        </div>
        <div className="text-xs w-[180px] truncate">{data.description}</div>
        <div className="text-xs text-neutral-500">{data.class}</div>
      </div>
    </div>
  );
}

function Homeworks() {
  const rawHomeworks = useGetApi(USER_CLASSES);

  let homeworks = [];

  if (rawHomeworks) {
    rawHomeworks.forEach((cl) => {
      cl.homeworks.forEach((homework) => {
        homeworks.push(homework);
      });
    });
  }

  return (
    <>
      <div className="flex flex-row">
        <div className="w-96 bg-gray-200 h-screen flex flex-col items-center p-2.5 gap-2.5">
          {homeworks.map((data) => (
            <HomeworkButton data={data} />
          ))}
        </div>
        <div>
          <Routes>
            <Route path="/">
              <Route path="/:homeworkId" element={<HomeworkPage />} />
            </Route>
          </Routes>
        </div>
      </div>
    </>
  );
}

function HomeworkPage() {
  const location = useLocation();
  return <div>{JSON.stringify(location)}</div>;
}

export default Homeworks;
