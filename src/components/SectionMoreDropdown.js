import React from "react";
import { MoreOutlined } from "@ant-design/icons";
import { Dropdown } from "antd";

const backend_url = process.env.REACT_APP_BACKEND_URL
  ? process.env.REACT_APP_BACKEND_URL
  : "https://kanban-backend-tcea.onrender.com/";
const items = [
  {
    key: "1",
    label: <div>Delete</div>,
  },
];
const SectionMoreDropDown = ({ sections, setSections, sectionId }) => {
  const onDeleteSection = (sectionId) => {
    deleteSection(sectionId);
  };
  const deleteSection = (sectionId) => {
    setSections((prevState) =>
      prevState.filter((data) => data._id !== sectionId)
    );
    fetch(backend_url + `sections/${sectionId}`, {
      method: "DELETE",
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then(async (resJson) => {
        console.log(resJson);
      })
      .catch((err) => {
        console.log(err.toString());
      })
      .finally(() => {
        console.log("section deleted");
      });
  };

  const handleOnClick = (e, sectionId) => {
    if (e.key == "1") {
      onDeleteSection(sectionId);
    }
  };
  return (
    <Dropdown
      menu={{
        items,
        onClick: (e) => handleOnClick(e, sectionId),
      }}
    >
      <div className="flex justify-end">
        <MoreOutlined size={4} className="text-gray7 rotate-90" />
      </div>
    </Dropdown>
  );
};
export default SectionMoreDropDown;
