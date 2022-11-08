import { useGetApi, USER_CLASSES } from "../../hooks/Api";

const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const homeworkImportanceColors = ["#D95F5F", "#ECA25E", "#75D066"];
const homeworkImportanceDefinitions = ["PAST DUE", "DUE TODAY", "UPCOMING"];

function Homework({ data }) {
  const set = new Date(data.set);
  const due = new Date(data.due);

  const dueDay = weekdays[due.getDay()];
  const dueDate = due.getDate();
  const dueMonth = months[due.getMonth()];
  const currentDate = new Date();

  const importance =
    due.toDateString() === currentDate.toDateString()
      ? 1
      : due < currentDate
      ? 0
      : 2;
  return (
    <div
      key={data._id}
      className="w-[calc(24rem-20px)] h-24 bg-neutral-100 rounded flex shadow-md"
    >
      <div
        className="w-24 h-full flex flex-col justify-around p-3 items-center rounded-tl rounded-bl"
        style={{ backgroundColor: homeworkImportanceColors[importance] }}
      >
        <div className="text-sm text-white/75">{dueDay}</div>
        <div className="text-2xl text-white">{dueDate}</div>
        <div className="text-sm text-white/75">{dueMonth}</div>
      </div>
      <div className="p-3 flex flex-col justify-around">
        <div
          className="font-bold text-xs"
          style={{ color: homeworkImportanceColors[importance] }}
        >
          {homeworkImportanceDefinitions[importance]}
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

const exampleData = [
  {
    title: "Analysis",
    description: "Send your analysis by the end of the day",
    set: "2022-10-18T13:40:52.915Z",
    due: "2022-10-19T01:40:52.915Z",
    class: "13Co/a1",
  },
  {
    title: "Design",
    description: "Send your design by the end of the day",
    set: "2022-10-18T13:40:54.267Z",
    due: new Date().toString(),
    class: "13Co/a1",
  },
  {
    title: "Pure chapters",
    description: "Complete chapters 1a, b and c from your pure book",
    set: "2022-10-18T13:40:54.267Z",
    due: new Date("2022-10-22").toString(),
    class: "13Ma/a1",
  },
  {
    title: "Moments",
    description: "Finish the exercise started in class on moments",
    set: "2022-10-18T13:40:54.267Z",
    due: new Date("2022-11-03").toString(),
    class: "13Ma/a1",
  },
];

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
      <div className="w-96 bg-gray-200 h-screen flex flex-col items-center p-2.5 gap-2.5">
        {homeworks.map((data) => (
          <Homework data={data} />
        ))}
      </div>
    </>
  );
}

export default Homeworks;
