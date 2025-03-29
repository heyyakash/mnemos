import React from "react";
import FileCard from "./FileCard";

import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import BreadCrumbAtom from "@/atoms/breadcrumb.atom";
import { useQuery } from "@tanstack/react-query";
import { HTTPRequest } from "@/api/api";
import { toast } from "sonner";
import { File } from "@/types/file.type";
import { useAtom } from "jotai";

const FileList = () => {
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

  if(isLoading){
    return <>Loading..</>
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
        </TableRow>
      </TableHeader>
      <TableBody>
        {files?.map((file, index) => {
          return (
            <FileCard
              id = {file.id}
              key={index}
              mode={"list"}
              title={file.name}
              type={file.folder ? "folder" : "file"}
              description={file.description}
              language={file.language || ""}
              updatedAt={file.createdAt}
            />
          );
        })}

      </TableBody>
    </Table>
    {files?.length === 0 ? <div className="text-center">Folder is empty</div> : <></>}
    </>
  );
};

export default FileList;
