import React from "react";
import { Dropdown } from "antd";
import { MoreOutlined } from "@ant-design/icons";

const backend_url = process.env.REACT_APP_BACKEND_URL
  ? process.env.REACT_APP_BACKEND_URL
  : "https://kanban-backend-tcea.onrender.com/";
const items = [
  {
    key: "1",
    label: <div>Delete</div>,
  },
];
const TaskMoreDropDown = ({ setTasks, sections, setSections, taskId }) => {
  const onDeleteTask = (taskId) => {
    deleteFromTasks(taskId);
    updateTaskIdsInSections(taskId);
  };
  const deleteFromTasks = (taskId) => {
    setTasks((prevState) => prevState.filter((data) => data._id !== taskId));
    fetch(backend_url + `tasks/${taskId}`, {
      method: "DELETE",
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then(async (resJson) => {})
      .catch((err) => {
        console.log(err.toString());
      })
      .finally(() => {
        console.log("section updated");
      });
  };

  const updateTaskIdsInSections = (taskId) => {
    let sectNew = sections.find((sec) => {
      return sec.taskIds.includes(taskId);
    });

    setSections((prevState) =>
      prevState._id === sectNew._id
        ? { ...prevState, taskIds: sectNew.filter((id) => id !== taskId) }
        : prevState
    );
    console.log(sections);
    fetch(backend_url + `/tasks/${taskId}/delete-id-from-section`, {
      method: "POST",
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then(async (resJson) => {})
      .catch((err) => {
        console.log(err.toString());
      })
      .finally(() => {
        console.log("section updated");
      });
  };
  const handleOnClick = (e, taskId) => {
    console.log(e, taskId);
    if (e.key === "1") {
      onDeleteTask(taskId);
    }
  };
  return (
    <Dropdown
      menu={{
        items,
        onClick: (e) => handleOnClick(e, taskId),
      }}
    >
      <div className="flex justify-end">
        <MoreOutlined className="text-gray7 rotate-90" />
      </div>
    </Dropdown>
  );
};
export default TaskMoreDropDown;
