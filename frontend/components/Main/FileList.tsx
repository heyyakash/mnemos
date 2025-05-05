import React, { FC } from "react";
import FileCard from "./FileCard";

import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { File } from "@/types/file.type";
interface props{
  list: File[] | undefined | null
  isLoading: boolean
}

const FileList:FC<props> = ({list, isLoading}) => {
  

  if(isLoading){
    return <>Loading..</>
  }

  if(list === undefined || list === null){
    return (
      <div className="text-center">Folder is empty</div>
    )
  }
  return (
    <>
    <Table>
      <TableCaption>A list of your files</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead></TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Language</TableHead>
          <TableHead className="text-right">Created At</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {list?.map((file, index) => {
          return (
            <FileCard
                key = {index}
                file = {file}
            />
          );
        })}

      </TableBody>
    </Table>

    </>
  );
};

export default FileList;
