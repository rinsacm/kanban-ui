import { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import AddTaskModal from "./AddTaskModal";
import AddSectionModal from "./AddSectionModal";
import TaskMoreDropDown from "./TaskMoreDropDown";
import { PlusOutlined } from "@ant-design/icons";
import dateUtil from "../utils/util";
import SectionMoreDropDown from "./SectionMoreDropdown";

const backend_url = process.env.REACT_APP_BACKEND_URL
  ? process.env.REACT_APP_BACKEND_URL
  : "http://localhost:3001/";

const DragAndDropArea = () => {
  const [tasks, setTasks] = useState([]);
  const [sections, setSections] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddTaskModalVisible, setIsAddTaskModalVisible] = useState(false);
  const [sectionName, setSectionName] = useState();
  const [isAddSectionModalVisible, setIsAddSectionModalVisible] =
    useState(false);
  const getAllTasks = async () => {
    await fetch(backend_url + "tasks-all")
      .then((res) => {
        return res.json();
      })
      .then(async (data) => {
        console.log(data);
        setTasks(data.data);
      });
  };
  const getAllSections = async () => {
    await fetch(backend_url + "sections-all")
      .then((res) => {
        return res.json();
      })
      .then(async (data) => {
        console.log(data);
        setSections(data.data);
      });
  };
  useEffect(() => {
    console.log(process.env);

    getAllTasks();
    getAllSections();
  }, []);
  useEffect(() => {
    console.log(tasks);
    console.log(sections);
    if (sections.length > 0 || tasks.length > 0) setIsLoading(false);
  }, [sections, tasks]);
  useEffect(() => {
    // console.log(sections);
  }, [sections]);

  const updateTaskIdsInSection = async (secid, newIds) => {
    await fetch(backend_url + `update-section/${secid}`, {
      method: "PUT",
      withcredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        taskIds: newIds,
      }),
    })
      .then((res) => res.json)
      .then((data) => {});
  };

  const onDragEnd = async (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    const start = sections.find((ele) => {
      return ele["_id"] == source.droppableId;
    });
    const finish = sections.find(
      (ele) => ele["_id"] == destination.droppableId
    );

    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        taskIds: newTaskIds,
      };

      setSections(
        sections.map((sec) => (sec._id === newColumn._id ? newColumn : sec))
      );
      await updateTaskIdsInSection(newColumn._id, newTaskIds);
      return;
    }
    let startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    let newStart = {
      ...start,
      taskIds: startTaskIds,
    };

    let finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    let newFinish = {
      ...finish,
      taskIds: finishTaskIds,
    };
    setSections(
      sections.map((sec) =>
        sec._id === newStart._id
          ? newStart
          : sec._id === newFinish._id
          ? newFinish
          : sec
      )
    );
    await updateTaskIdsInSection(newStart._id, startTaskIds);
    await updateTaskIdsInSection(newFinish._id, finishTaskIds);
  };
  const getFormattedDueDate = (dateStr) => {
    let date = new Date(dateStr);
    let formattedDate = dateUtil(date);
    return formattedDate;
  };

  return (
    <div className=" flex flex-row w-screen  h-screen  overflow-auto scrollbar-hide items-start ">
      <div className=" flex p-3   flex-row  w-full  h-5/6">
        <DragDropContext onDragEnd={onDragEnd}>
          {sections.map((section) => {
            return (
              <Droppable
                droppableId={String(section._id)}
                key={section._id}
                className="min-w-48 "
              >
                {(provided) => (
                  <div
                    className=" flex-col m-2 border-solid border-gray-100 min-w-72 h-full pb-2"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    <div className="text-gray8 font-medium text-lg text-left my-2 justify-between flex">
                      {section.name}
                      <div className="text-gray7 font-light flex items-center text-sm  gap-2 ">
                        <PlusOutlined
                          size={6}
                          onClick={() => setIsAddTaskModalVisible(true)}
                        />

                        <SectionMoreDropDown
                          sections={sections}
                          setSections={setSections}
                          sectionId={section._id}
                        />
                      </div>
                    </div>
                    <div className="bg-gray1 overflow-scroll scrollbar-hide font-light rounded-2xl p-1 h-full  ">
                      <div>
                        {section.taskIds &&
                          section.taskIds.length > 0 &&
                          section.taskIds
                            .map((id) =>
                              tasks.find((item) => String(item._id) == id)
                            )
                            .filter((item) => item !== undefined)
                            .map((tsk, index) => {
                              return (
                                <div>
                                  <Draggable
                                    draggableId={tsk._id}
                                    key={tsk._id}
                                    index={index}
                                  >
                                    {(provided) => {
                                      {
                                        /* console.log(new Date(tsk.due), Date()); */
                                      }
                                      return (
                                        <div
                                          ref={provided.innerRef}
                                          {...provided.draggableProps}
                                          {...provided.dragHandleProps}
                                          className="flex  bg-white rounded-xl m-2 p-2 flex-col text-left shadow-sm gap-2"
                                        >
                                          <div className="flex justify-between">
                                            <div className="font-normal text-sm  text-gray5 text-wrap break-words">
                                              {tsk.desc}
                                            </div>
                                            <TaskMoreDropDown
                                              setTasks={setTasks}
                                              sections={sections}
                                              setSections={setSections}
                                              taskId={tsk._id}
                                            />
                                          </div>

                                          <div className="flex  justify-between gap-4 ">
                                            <div className="font-normal text-sm flex gap-2">
                                              <img
                                                alt="person"
                                                src="https://t4.ftcdn.net/jpg/03/83/25/83/360_F_383258331_D8imaEMl8Q3lf7EKU2Pi78Cn0R7KkW9o.jpg"
                                                className="rounded-full w-5 h-5"
                                              />
                                              <div
                                                className={`font-medium w-fit align-middle text-nowrap text-xs ${
                                                  new Date(tsk.due) < new Date()
                                                    ? "text-red"
                                                    : "text-blue"
                                                }`}
                                              >
                                                {getFormattedDueDate(tsk.due)}
                                              </div>
                                            </div>
                                            <div className="bg-gray6 py-1 px-2 text-xs rounded-lg text-gray7 text-wrap flex break-words">
                                              {tsk.name}
                                            </div>
                                          </div>
                                        </div>
                                      );
                                    }}
                                  </Draggable>
                                </div>
                              );
                            })}
                      </div>

                      <div>
                        <button
                          type="button"
                          class="text-light-gray-purple  focus:none font-medium  flex-col justify-center items-center h-16  text-sm px-5 py-2.5 me-2 mb-2 "
                          onClick={() => setIsAddTaskModalVisible(true)}
                        >
                          + Add Task
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </Droppable>
            );
          })}
          <AddSectionModal
            isVisible={isAddSectionModalVisible}
            setIsVisible={setIsAddSectionModalVisible}
            sections={sections}
            setSections={(sections) => setSections(sections)}
          />
          <AddTaskModal
            isVisible={isAddTaskModalVisible}
            setIsVisible={setIsAddTaskModalVisible}
            tasks={tasks}
            setTasks={(tasks) => setTasks(tasks)}
            sections={sections}
            setSections={(sections) => setSections(sections)}
          />
        </DragDropContext>
        <div>
          <button
            type="button"
            class="text-light-gray-purple  focus:none font-medium  text-lg gap-2   min-w-48 text-left flex  items-center  justify-center my-4"
            onClick={() => setIsAddSectionModalVisible(true)}
          >
            <PlusOutlined
              size={10}
              onClick={() => setIsAddTaskModalVisible(true)}
            />
            Add Section
          </button>
        </div>
      </div>
    </div>
  );
};
export default DragAndDropArea;
