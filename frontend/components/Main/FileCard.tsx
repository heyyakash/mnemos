"use client";
import { Braces, Folder } from "lucide-react";
import React, { FC } from "react";
import { Badge } from "../ui/badge";
import { TableCell, TableRow } from "@/components/ui/table";

interface props {
  type: "file" | "folder";
  description: string;
  updatedAt: string;
  title: string;
  language?: string;
  mode?: "grid" | "list";
}

const FileCard: FC<props> = ({ type, title, language,description, mode }) => {
  if (mode === "grid") {
    return (
      <div className="border-2 w-full gap-4 p-4 flex flex-col">
        <div className="w-full bg-secondary h-[40px] rounded-sm flex-hard-center">
          {type === "file" ? <Braces /> : <Folder />}
        </div>
        <div className="flex w-full flex-col">
          <div className="flex-center justify-between">
            <h3 className="text-xl font-semibold">{title}</h3>
          </div>

          <div className="mt-3 flex gap-2 ">
            <Badge className="self-start">CL</Badge>
            <Badge className="self-start">Bash</Badge>
          </div>
        </div>
      </div>
    );
  }
  return (
    <TableRow className="cursor-pointer">
      <TableCell className="font-medium">
        {type === "folder" ? <Folder className="text-xs text-orange-500 h-4" /> : <Braces className="text-xs text-blue-500 h-4" />}
      </TableCell>
      <TableCell>{title}</TableCell>
      <TableCell className="max-w-[20ch] truncate">
        {description}
      </TableCell>
      <TableCell>{language || ""}</TableCell>
      <TableCell className="text-right">
        {new Date().toUTCString().slice(0, 16)}
      </TableCell>
    </TableRow>
  );
};

export default FileCard;
