import editorModeAtom from "@/atoms/editorMode.atom";
import { RxCross2 } from "react-icons/rx";
import { useAtom } from "jotai";
import { IoRefresh } from "react-icons/io5";
import React from "react";
import { Input } from "../ui/input";

const Content = () => {
  const [, setEditorMode] = useAtom(editorModeAtom);
  return (
    <div className="col-span-2">
      <div className="p-4 flex  items-center h-[80px] flex-row gap-4 border-b-2">
        <div className="flex gap-2">
          <Input type = "text" className = "bg-transparent" placeholder = "Enter The Title" />
        </div>

        <div className="flex-hard-center gap-2 ml-auto"></div>

        <div
          onClick={() => setEditorMode(false)}
          className="w-6 h-6 rounded-full text-lg cursor-pointer hover:bg-secondary hover:text-primary font-bold flex-hard-center self-center  bg-red-500 text-primary"
        >
          <RxCross2 />
        </div>
        <div
          onClick={() => setEditorMode(false)}
          className="w-6 h-6   rounded-full text-xl cursor-pointer hover:bg-secondary hover:text-primary font-bold flex-hard-center self-center  bg-green-500 text-primary"
        >
          -
        </div>
        <div
          className="w-6 h-6   rounded-full text-xl cursor-pointer hover:bg-primary hover:text-secondary font-bold flex-hard-center self-center  bg-background text-primary"
        >
          <IoRefresh />
        </div>
      </div>
    </div>
  );
};

export default Content;
