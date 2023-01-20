import {
  usePostApi,
  useGetApi,
  CLASS_CREATE,
  HOMEWORK_CREATE,
  CREATOR_HOMEWORKS,
  CREATOR_CLASSES,
  USER_HOMEWORKS,
  HOMEWORK_REMOVE,
} from "../../hooks/Api";
import { useRef, useState } from "react";

import { useFeedback } from "../../hooks/Feedback";
import { useAuth } from "../../hooks/Auth";

function Teacher() {
  return (
    <div className="flex flex-row gap-2">
      <Classes />
    </div>
  );
}

function ClassButton({ classData, setSelectedClassId }) {
  const { name } = classData;
  return (
    <button
      onClick={() => {
        setSelectedClassId(classData?._id);
      }}
    >
      {name}
    </button>
  );
}

function CreateClassModal() {
  const createClass = usePostApi(CLASS_CREATE, [CREATOR_CLASSES]);
  const className = useRef();

  function handleCreateClass() {
    createClass({ name: className.current.value });
  }

  return (
    <div className="p-2.5">
      <div className="flex flex-row justify-between">
        <div>Name: </div>
        <input ref={className} />
      </div>
      <button onClick={handleCreateClass}>create</button>
    </div>
  );
}

function Classes() {
  const { createModal } = useFeedback();
  const createdClasses = useGetApi(CREATOR_CLASSES);
  const [selectedClassId, setSelectedClassId] = useState();
  return (
    <>
      <div className="flex flex-col gap-1">
        <button
          onClick={() => {
            createModal(<CreateClassModal />);
          }}
        >
          create class
        </button>
        {createdClasses ? (
          createdClasses.map((classData) => (
            <ClassButton
              classData={classData}
              setSelectedClassId={setSelectedClassId}
              key={setSelectedClassId}
            />
          ))
        ) : (
          <>loading classes</>
        )}
      </div>
      {selectedClassId ? <Homeworks selectedClassId={selectedClassId} /> : null}
    </>
  );
}

function HomeworkButton({ data }) {
  const deleteHomework = usePostApi(HOMEWORK_REMOVE, [
    CREATOR_HOMEWORKS,
    USER_HOMEWORKS,
  ]);
  return (
    <div className="flex flex-row bg-neutral-200 justify-between gap-2.5">
      <div>{data.title}</div>
      <button
        onClick={() => {
          deleteHomework({ homeworkId: data._id });
        }}
      >
        delete
      </button>
    </div>
  );
}

function CreateHomeworkModal({ classId }) {
  const createHomework = usePostApi(HOMEWORK_CREATE, [
    CREATOR_HOMEWORKS,
    USER_HOMEWORKS,
  ]);
  const { user } = useAuth();
  const { closeModal } = useFeedback();

  const title = useRef();
  const description = useRef();
  const due = useRef();

  const resourceLink = useRef();
  const resourceName = useRef();

  const [resources, setResources] = useState([]);
  const [resourceModalState, setResourceModalState] = useState(false);

  function handleCreateHomework() {
    closeModal();
    createHomework({
      title: title.current.value,
      description: description.current.value,
      due: due.current.value,
      classId: classId,
      resources: resources,
      teacherName: user.displayName,
      teacherPhoto: user.photoURL,
    });
  }

  return (
    <div className="p-2.5">
      <div className="flex flex-row justify-between">
        <div>Title: </div>
        <input ref={title} />
      </div>
      <div className="flex flex-row justify-between">
        <div>Description: </div>
        <input ref={description} />
      </div>
      <div className="flex flex-row justify-between">
        <div>Due: </div>
        <input type="date" ref={due} />
      </div>
      <div className="flex flex-col justify-between">
        <div className="flex flex-row">
          <div>Resources: </div>
          <button
            onClick={() => {
              setResourceModalState(true);
            }}
          >
            Add Resource
          </button>
        </div>
        {resources?.map((resource) => (
          <div key={resource.name}>{resource.name}</div>
        ))}
      </div>
      <button onClick={handleCreateHomework}>create</button>
      {resourceModalState ? (
        <div className="flex flex-col">
          <div className="flex flex-row justify-between gap-2.5">
            <div>Resource Name</div>
            <input ref={resourceName} />
          </div>
          <div className="flex flex-row justify-between gap-2.5">
            <div>Resource Link</div>
            <input ref={resourceLink} />
          </div>
          <div>
            <button
              onClick={() => {
                setResourceModalState(false);
              }}
            >
              cancel
            </button>
            <button
              onClick={() => {
                resources.push({
                  name: resourceName.current.value,
                  link: resourceLink.current.value,
                });
                setResources(resources);
                setResourceModalState(false);
              }}
            >
              create
            </button>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

function Homeworks({ selectedClassId }) {
  const createdHomeworks = useGetApi(CREATOR_HOMEWORKS);
  const { createModal } = useFeedback();
  const filteredHomeworks = createdHomeworks?.filter(
    (homework) => homework.classId === selectedClassId
  );

  return (
    <div className="flex flex-col">
      <button
        onClick={() => {
          createModal(<CreateHomeworkModal classId={selectedClassId} />);
        }}
      >
        create Homework
      </button>
      <div className="flex flex-col gap-2.5">
        {filteredHomeworks ? (
          filteredHomeworks.map((homework) => (
            <HomeworkButton data={homework} key={homework._id} />
          ))
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default Teacher;
