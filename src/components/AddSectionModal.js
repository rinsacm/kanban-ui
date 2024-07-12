import { CloseOutlined } from "@ant-design/icons";
import { Form, Input } from "antd";
import Modal from "antd/es/modal/Modal";
import { useEffect, useState } from "react";

const backend_url = process.env.REACT_APP_BACKEND_URL
  ? process.env.REACT_APP_BACKEND_URL
  : "https://kanban-backend-tcea.onrender.com/";
const AddSectionModal = ({
  isVisible,
  setIsVisible,

  sections,
  setSections,
}) => {
  const [taskSection, setTaskSection] = useState("");
  useEffect(() => {
    console.log("Sections updated:", sections);
  }, [sections]);

  const addSection = async (e) => {
    e.preventDefault();
    fetch(backend_url + "add-section", {
      method: "POST",
      withcredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: taskSection,
        taskIds: [],
      }),
    })
      .then((res) => res.json())
      .then(async (data) => {
        console.log(data);
        console.log(data);
        setSections((prevState) => [
          ...prevState,
          {
            _id: data.data.insertedId,
            name: taskSection,
            taskIds: [],
          },
        ]);
        onClose();
      });
  };
  const clearinputs = () => {
    setTaskSection();
  };
  const onClose = () => {
    clearinputs();
    setIsVisible(false);
  };
  if (isVisible)
    return (
      <Modal
        open={isVisible}
        okText="Save"
        onOk={addSection}
        onCancel={onClose}
      >
        <div className=" flex flex-row w-full justify-center gap-2 pt-8">
          <label className="flex flex-col items-center">Section Name :</label>
          <Input
            value={taskSection}
            onChange={(e) => {
              setTaskSection(e.target.value);
            }}
            type="text"
            className="w-fit"
            placeholder="Task Name"
          />
        </div>
      </Modal>
    );
};
export default AddSectionModal;
