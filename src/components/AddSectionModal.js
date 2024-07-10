import { CloseOutlined } from "@ant-design/icons";
import { Input } from "antd";
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
      <div className="fixed top-0 w-screen h-screen bg-light-gray-purple bg-opacity-10 left-0 flex">
        <form className="m-auto   flex-col bg-white p-2 rounded-lg ">
          <div
            className="text-right font-semibold text-gray2"
            onClick={() => onClose()}
          >
            <CloseOutlined size={2} />
          </div>
          <div className="grid grid-cols-2 my-2">
            <label className="text-left text-gray2 text-sm">Section Name</label>
            <Input
              value={taskSection}
              onChange={(e) => {
                setTaskSection(e.target.value);
              }}
              type="text"
              className="focus:none border-gray3 border-2 rounded-lg placeholder-gray4"
            />
          </div>

          <button
            type="submit"
            onClick={addSection}
            className="bg-blue p-2 rounded  text-white font-medium px-4"
          >
            Save
          </button>
        </form>
      </div>
    );
};
export default AddSectionModal;
