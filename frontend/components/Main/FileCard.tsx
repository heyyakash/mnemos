"use client";
import { Braces, Folder } from "lucide-react";
import React, { FC } from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { useAtom } from "jotai";
import BreadCrumbAtom from "@/atoms/breadcrumb.atom";
import currentSnippetAtom from "@/atoms/currentSnippet";
import { File } from "@/types/file.type";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { MdDeleteOutline } from "react-icons/md";
import { HTTPRequest } from "@/api/api";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface props {
  file: File;
}

const FileCard: FC<props> = ({ file }) => {
  const [, setBreadCrumb] = useAtom(BreadCrumbAtom);
  const [, setCurrentSnippet] = useAtom(currentSnippetAtom);

  const clickBehaviour = () => {
    if (file.folder) {
      setBreadCrumb((breadCrumb) => [
        ...breadCrumb,
        { id: file.id, name: file.name },
      ]);
    } else {
      if (file.snippet) {
        setCurrentSnippet(file.snippet.id);
      }
    }
  };

  const deleteFile = async () => {
    const id = file.id
    const request = await HTTPRequest(`/file/${id}`, {}, "DELETE")
    if(request?.response.success){
      toast.success(request.response.message);
    }else{
      toast.error(request?.response.message)
    }
    return null
  }

  const useDeleteItem = () => {
    const queryClient=  useQueryClient()

    return useMutation({
      mutationFn: deleteFile,
      onSuccess : () => {
        queryClient.invalidateQueries({queryKey:["files"]})
      }
    })
  }

  const deleteMutation = useDeleteItem()

  const handleDelete = () => {
    deleteMutation.mutate()
  }

  return (
    <TableRow onClick={() => clickBehaviour()} className="cursor-pointer">
      <TableCell className="font-medium">
        {file.folder ? (
          <Folder className="text-xs text-orange-500 h-4" />
        ) : (
          <Braces className="text-xs text-blue-500 h-4" />
        )}
      </TableCell>
      <TableCell>{file.name}</TableCell>
      <TableCell className="max-w-[20ch] truncate">
        {file.description}
      </TableCell>
      <TableCell>{file.language || ""}</TableCell>
      <TableCell className="text-right">
        {new Date(file.createdAt * 1000).toUTCString().slice(0, 16)}
      </TableCell>
      <TableCell onClick={(e) => {e.stopPropagation()}}>
        <AlertDialog>
          <AlertDialogTrigger>
          <MdDeleteOutline className="text-red-400 text-xl" />

          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                snippet and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={()=> handleDelete()}>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </TableCell>
    </TableRow>
  );
};

export default FileCard;
