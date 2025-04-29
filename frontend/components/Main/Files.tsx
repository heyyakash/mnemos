"use client";

import React, { useState } from "react";
import { SidebarTrigger } from "../ui/sidebar";
import { Separator } from "../ui/separator";


// import { LayoutGrid, List } from "lucide-react";
import { useAtom } from "jotai";
import editorModeAtom from "@/atoms/editorMode.atom";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import BreadcrumbComponent from "../Breadcrumb";
import CreateNewFile from "./CreateNewFile";
import { VscNewFolder } from "react-icons/vsc";
import CreateNewFolder from "./CreateNewFolder";
import FileList from "./FileList";

const Files = () => {



  const [mode, ] = useState<"list" | "grid">("list");
  const [, setEditorMode] = useAtom(editorModeAtom);
  return (
    <div className="col-span-1  border-r">
      <div className="p-4 flex items-center h-[80px] flex-row gap-4 border-b">
        <SidebarTrigger />
        <Separator className="-ml-2" orientation="vertical" />
        <BreadcrumbComponent />
  
        <div className="ml-auto"></div>
        <Sheet>
          <SheetTrigger asChild>
            <div
              onClick={() => setEditorMode(true)}
              className="w-7 h-7 rounded-full text-2xl cursor-pointer hover:bg-secondary hover:text-primary font-semibold flex-hard-center self-center bg-primary text-secondary"
            >
              +
            </div>
          </SheetTrigger>
          <SheetContent className="w-[600px]">
            <CreateNewFile />
          </SheetContent>
        </Sheet>
        <Sheet>
          <SheetTrigger asChild>
            <div
              onClick={() => setEditorMode(true)}
              className="w-7 h-7 rounded-full text-2xl cursor-pointer hover:bg-secondary hover:text-primary font-semibold flex-hard-center self-center text-primary"
            >
              <VscNewFolder />
            </div>
          </SheetTrigger>
          <SheetContent className="w-[600px]">
            <CreateNewFolder />
          </SheetContent>
        </Sheet>
      </div>
      <div
        className={`${
          mode === "grid" ? "grid gap-2 grid-cols-4" : " flex flex-col gap-2"
        } p-2`}
      >
          <FileList />
      </div>
    </div>
  );
};

export default Files;
