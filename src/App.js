import "./App.css";
import DragAndDropArea from "./components/DragAndDropArea";
import Input from "antd/es/input/Input";
import {
  AppleFilled,
  ArrowLeftOutlined,
  LogoutOutlined,
  MenuOutlined,
  SearchOutlined,
  SettingFilled,
  SettingOutlined,
} from "@ant-design/icons";
import { Button } from "antd";
import { useState } from "react";

function App() {
  const [isNavVisible, setIsNavVisible] = useState(false);
  const handleNavClick = () => {
    setIsNavVisible(!isNavVisible);
  };
  return (
    <div className="App  flex font-inter  h-full bg-white flex-col  my-auto scrollbar-hide::-webkit-scrollbar scrollbar-hide overflow-hidden">
      <div className="flex justify-between p-1 align-middle w-screen">
        <div className="h-full flex  items-center justify-center gap-1 md:gap-3 ">
          <div className=" flex items-center justify-center ">
            <Button className="w-9 h-9 aspect-square">
              <ArrowLeftOutlined style={{ borderColor: "#F2F2F4" }} size={5} />
            </Button>
          </div>

          <div className=" flex items-center justify-center bg-dark-gray rounded-md h-9 w-9  ">
            <AppleFilled className=" text-white" />
          </div>
          <div className="grid grid-cols-2 grid-rows-2">
            <div className="col-span-2 row-span-2">
              <div className="text-left col-span-6 row-span-2 text-gray8 font-medium">
                Apple
              </div>
              <div className="flex text-xs text-gray7   items-center gap-1">
                <div>5 boards</div>.<div>24 members</div>
              </div>
            </div>
          </div>
        </div>
        <div className="hidden md:flex flex-row flex-wrap gap-3 items-center  justify-center ">
          <div>
            <Input
              className="w-fit flex-grow min-w-3"
              placeholder="Search"
              prefix={<SearchOutlined className="text-gray4" />}
            />
          </div>
          <div className="">
            <Button className="text-gray4">
              <LogoutOutlined />
            </Button>
          </div>
          <div>
            <Button>
              <SettingOutlined className="text-gray4" />
            </Button>
          </div>
        </div>
        <div className="flex md:hidden fixed top-0 right-0 p-1 justify-end  bg-white">
          <div className=" ">
            <MenuOutlined
              onClick={handleNavClick}
              className="w-full justify-end my-2"
            />
            <div
              className={
                isNavVisible ? "flex flex-col  shadow-sm gap-1" : "hidden"
              }
            >
              <div>
                <Input
                  className=" flex-grow w-48"
                  placeholder="Search"
                  prefix={<SearchOutlined />}
                />
              </div>
              <div>
                <LogoutOutlined className="w-full justify-center" />
              </div>
              <div>
                <SettingFilled className="w-full justify-center" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <DragAndDropArea />
    </div>
  );
}

export default App;
