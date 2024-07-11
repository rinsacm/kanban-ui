import { CloseOutlined } from "@ant-design/icons";
import { Form, Select } from "antd";
import Input from "antd/es/input/Input";
import { useEffect, useState } from "react";

const backend_url = process.env.REACT_APP_BACKEND_URL
  ? process.env.REACT_APP_BACKEND_URL
  : "https://kanban-backend-tcea.onrender.com/";
const AddTaskModal = ({
  isVisible,
  setIsVisible,
  tasks,
  setTasks,
  sections,
  setSections,
}) => {
  const [taskName, setTaskName] = useState("");
  const [taskDesc, setTaskDesc] = useState("");
  const [taskDue, setTaskDue] = useState("");
  const [taskAssignee, setTaskAssignee] = useState();
  const [taskSection, setTaskSection] = useState("");
  useEffect(() => {
    if (sections[0] !== undefined) setTaskSection(sections[0]._id);
  }, [sections]);

  const updateSection = (secid, taskId) => {
    const updatedSec = (datas) =>
      datas.map((sec) =>
        sec._id === secid ? { ...sec, taskIds: [...sec.taskIds, taskId] } : sec
      );
    console.log(updatedSec);

    setSections((prevState) => updatedSec(prevState));

    fetch(backend_url + `update-section/${secid}/${taskId}`, {
      method: "PUT",
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
        onClose();
      });
  };
  const addTask = async (e) => {
    e.preventDefault();
    fetch(backend_url + "add-task", {
      method: "POST",
      withcredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: taskName,
        desc: taskDesc,
        due: taskDue,
        assignee: taskAssignee,
      }),
    })
      .then((res) => res.json())
      .then(async (data) => {
        setTasks((prevState) => [
          ...prevState,
          {
            name: taskName,
            desc: taskDesc,
            due: taskDue,
            assignee: taskAssignee,
            _id: data.data.insertedId,
          },
        ]);

        await updateSection(taskSection, data.data.insertedId);
      });
  };
  const clearinputs = () => {
    setTaskName("");
    setTaskAssignee("");
    setTaskDesc("");
    setTaskDue(new Date());
    setTaskSection(sections[0]._id);
  };
  const onClose = () => {
    clearinputs();
    setIsVisible(false);
  };
  if (isVisible)
    return (
      <div className="fixed top-0 w-screen h-screen bg-light-gray-purple bg-opacity-10 left-0 flex">
        <Form
          name="wrap"
          labelCol={{
            span: 10,
          }}
          labelAlign="left"
          wrapperCol={{
            span: 14,
          }}
          colon={false}
          className="m-auto   flex-col bg-white p-4 rounded-lg"
        >
          <div
            className="text-right font-semibold text-gray2"
            onClick={() => onClose()}
          >
            <CloseOutlined />
          </div>

          <Form.Item
            label="TaskName"
            value={taskName}
            onChange={(e) => {
              setTaskName(e.target.value);
            }}
            type="text"
          >
            <Input
              value={taskName}
              onChange={(e) => {
                setTaskName(e.target.value);
              }}
              type="text"
              placeholder="Task Name"
            />
          </Form.Item>

          <Form.Item
            label="Description"
            value={taskDesc}
            onChange={(e) => setTaskDesc(e.target.value)}
            type="text"
            placeholder="Description"
          >
            <Input
              value={taskDesc}
              onChange={(e) => setTaskDesc(e.target.value)}
              type="text"
              placeholder="Description"
            />
          </Form.Item>
          <Form.Item
            label="Due Date"
            type="date"
            value={taskDue}
            onChange={(e) => setTaskDue(e.target.value)}
            placeholder="date"
          >
            <Input
              type="date"
              className="w-full md:w-auto"
              value={taskDue}
              onChange={(e) => setTaskDue(e.target.value)}
              placeholder="date"
            />
          </Form.Item>
          <Form.Item
            label="Assignee"
            value={taskAssignee}
            onChange={(e) => {
              setTaskAssignee(e.target.value);
            }}
            type="text"
          >
            <Input
              value={taskAssignee}
              onChange={(e) => {
                setTaskAssignee(e.target.value);
              }}
              type="text"
              placeholder="Assignee Name"
            />
          </Form.Item>

          <Form.Item label="Section">
            <Select
              defaultValue={taskSection}
              className="w-full"
              onChange={(val) => setTaskSection(val)}
              options={[
                ...sections.map((sec) => {
                  return {
                    value: sec._id,
                    label: sec.name,
                  };
                }),
              ]}
            />
          </Form.Item>

          <button
            type="submit"
            onClick={addTask}
            className="bg-blue p-2 rounded  text-white font-medium px-4"
          >
            Save
          </button>
        </Form>
      </div>
    );
};
export default AddTaskModal;
