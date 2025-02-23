"use client";

import React, { useState } from "react";
import { SidebarTrigger } from "../ui/sidebar";
import { Separator } from "../ui/separator";
import FileCard from "./FileCard";
import { LayoutGrid, List } from "lucide-react";

const Files = () => {
  const [mode, setMode] = useState<"list" | "grid">("list");
  return (
    <div className="col-span-1  border-r-2">
      <div className="p-4 flex items-center h-[80px] flex-row gap-4 border-b-2">
        <SidebarTrigger />
        <Separator className="-ml-2" orientation="vertical" />
        <h3 className=" text-xl">/Root</h3>
        <div className="ml-auto">
          <div className="bg-secondary grid grid-cols-2 p-1 rounded-md gap-2">
            <div
              className={`${
                mode === "list" ? "bg-background" : ""
              } p-1 px-2 cursor-pointer`}
              onClick={() => setMode("list")}
            >
              <List height={20} />
            </div>
            <div
              className={` ${
                mode === "grid" ? "bg-background" : ""
              } p-1 px-2 cursor-pointer`}
              onClick={() => setMode("grid")}
            >
              <LayoutGrid height={20} />
            </div>
          </div>
        </div>
      </div>
      <div className={`${mode === "grid"? "grid gap-2 grid-cols-4":" flex flex-col gap-2"} p-2`}>
        <FileCard mode = {mode} title="PSQL login snippet" language="Bash" type="file" />
        <FileCard mode = {mode} title="Docker snippets" type="folder" />
      </div>
    </div>
  );
};

export default Files;
