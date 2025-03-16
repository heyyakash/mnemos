"use client";

import React, { useState } from "react";
import { SidebarTrigger } from "../ui/sidebar";
import { Separator } from "../ui/separator";
import FileCard from "./FileCard";

import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { LayoutGrid, List } from "lucide-react";
import { useAtom } from "jotai";
import editorModeAtom from "@/atoms/editorMode.atom";

const Files = () => {
  const [mode, setMode] = useState<"list" | "grid">("list");
  const [, setEditorMode] = useAtom(editorModeAtom)
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

            <div onClick={()=>setEditorMode(true)} className="w-7 h-7 rounded-full text-2xl cursor-pointer hover:bg-secondary hover:text-primary font-semibold flex-hard-center self-center bg-primary text-secondary">
               +
            </div>

      </div>
      <div
        className={`${
          mode === "grid" ? "grid gap-2 grid-cols-4" : " flex flex-col gap-2"
        } p-2`}
      >
        <Table>
          <TableCaption>A list of your files</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead></TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Language</TableHead>
              <TableHead className="text-right">Created At</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>

                <FileCard mode={mode} title="Postgres commands" type="file" description="Postgres run docker command" language="bash" updatedAt="" />
                <FileCard mode={mode} title="Docker commands" type="folder" description="handy docker commands" language="" updatedAt="" />

  
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Files;
