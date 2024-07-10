import "./App.css";
import DragAndDropArea from "./components/DragAndDropArea";
import Input from "antd/es/input/Input";
import {
  AppleFilled,
  ArrowLeftOutlined,
  LogoutOutlined,
  SearchOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Button } from "antd";

function App() {
  return (
    <div className="App flex font-inter  min-h-screen bg-white flex-col mx-auto my-auto scrollbar-hide::-webkit-scrollbar scrollbar-hide">
      <div className="flex justify-between p-1 align-middle">
        <div className="h-full flex  items-center justify-center gap-1">
          <div className=" flex items-center justify-center aspect-square">
            <Button className="w-auto ">
              <ArrowLeftOutlined size={5} />
            </Button>
          </div>

          <div className=" flex items-center justify-center bg-dark-gray rounded-md h-9 w-9  ">
            <AppleFilled className=" text-white" />
          </div>
          <div className="grid grid-cols-3 grid-rows-2">
            <div className="col-span-2 row-span-2">
              <div className="text-left col-span-6 row-span-2 text-gray8 font-medium">
                Apple
              </div>
              <div className="flex text-xs  items-center gap-1">
                <div>5 boards</div>
                <div>24 members</div>
              </div>
            </div>
          </div>
        </div>
        <div className=" flex flex-row flex-wrap gap-3 items-center  justify-center">
          <div>
            <Input
              className="w-fit flex-grow"
              placeholder="Search"
              prefix={<SearchOutlined />}
            />
          </div>
          <div>
            <LogoutOutlined />
          </div>
          <div>
            <SettingOutlined />
          </div>
        </div>
      </div>
      <DragAndDropArea />
    </div>
  );
}

export default App;
