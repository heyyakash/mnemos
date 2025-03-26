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
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import BreadcrumbComponent from "../Breadcrumb";
import CreateNewFile from "./CreateNewFile";
import { VscNewFolder } from "react-icons/vsc";
import CreateNewFolder from "./CreateNewFolder";
import BreadCrumbAtom from "@/atoms/breadcrumb.atom";
import { useQuery } from "@tanstack/react-query";
import { HTTPRequest } from "@/api/api";
import { toast } from "sonner";
import { File } from "@/types/file.type";

const Files = () => {
  const [breadCrumb] = useAtom(BreadCrumbAtom);
  const fetchFiles = async () => {
    const res = await HTTPRequest(
      `/file/folder/contents/${breadCrumb[breadCrumb.length - 1].id}`,
      {},
      "GET"
    );
    if (res?.status === 200) {
      console.log(res.response.message);
      return res.response.message;
    } else {
      toast.error(res?.response.message);
      return null;
    }
  };

  const { data: files, isLoading } = useQuery<File[] | null>({
    queryKey: ["files", breadCrumb],
    queryFn: fetchFiles,
    enabled: !!breadCrumb?.length,
  });

  const [mode, setMode] = useState<"list" | "grid">("list");
  const [, setEditorMode] = useAtom(editorModeAtom);
  return (
    <div className="col-span-1  border-r-2">
      <div className="p-4 flex items-center h-[80px] flex-row gap-4 border-b-2">
        <SidebarTrigger />
        <Separator className="-ml-2" orientation="vertical" />
        <BreadcrumbComponent />
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
              className="w-7 h-7 rounded-full text-2xl cursor-pointer hover:bg-secondary hover:text-primary font-semibold flex-hard-center self-center bg-primary text-secondary"
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
            {files?.map((file, index) => {
              return (
                <FileCard
                  key={index}
                  mode={mode}
                  title={file.name}
                  type={file.isFolder ? "folder" : "file"}
                  description={file.description}
                  language={file.language || ""}
                  updatedAt={file.createdAt}
                />
              );
            })}

            {files?.length === 0 ? (<>Folder is empty</>):(<></>)}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Files;
