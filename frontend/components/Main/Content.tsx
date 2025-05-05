"use client";
import { Archive, Braces, Trash2 } from "lucide-react";
import { FaCircle } from "react-icons/fa";
import React from "react";
import { Button } from "../ui/button";
import { FiClock } from "react-icons/fi";
import { useAtom } from "jotai";
import currentSnippetAtom from "@/atoms/currentSnippet";
import { HTTPRequest } from "@/api/api";
import {  useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Snippet } from "@/types/snippet.type";
import { Badge } from "../ui/badge";
import SyntaxHighlighter from "react-syntax-highlighter";
import docco from "react-syntax-highlighter/dist/esm/styles/hljs/agate";
import { MdEdit } from "react-icons/md";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import EditFile from "./EditFile";
import Timeline from "./timeline";
import { Separator } from "../ui/separator";
import formatUnixDate from "@/utils/dateConverter";

import { toast } from "sonner";

const Content = () => {
  const [currentSnip, setCurrentSnip] = useAtom(currentSnippetAtom);
  const queryClient = useQueryClient()

  const fetchSnip = async () => {
    const res = await HTTPRequest(`/snippet/${currentSnip}`, {}, "GET");
    if (res?.response.success) {
      return res.response.message;
    } else {
      return null;
    }
  };

  const { data, isLoading } = useQuery<Snippet | null>({
    queryKey: ["snippet", currentSnip],
    enabled: currentSnip !== null,
    queryFn: fetchSnip,
  });


  const archiveFile = async () => {
    if(!currentSnip) return
    const result = await HTTPRequest(`/file/archive/${currentSnip}`, {}, "GET")
    if(result?.response.success){
      toast.success(result?.response.message)
    }else{
      toast.error(result?.response.message)
    }
  }

  const archiveMutation = useMutation({
    mutationFn: archiveFile,
    onSuccess : () => {
      queryClient.invalidateQueries({
        queryKey:["files"]
      })
      setCurrentSnip("")
      queryClient.setQueryData(["snippet"], null)
    }
  })



  return (
    data && (
      <div className="col-span-2 max-h-[99vh] flex flex-col">
        <div className="p-4 flex  items-center h-[80px] flex-row gap-4 border-b">
        <Braces className=" text-blue-500 h-6" />
          <h2 className="text-2xl font-semibold">{data?.title}</h2>
          <div className="flex gap-1 ml-auto">
            <Sheet>
              <SheetTrigger className="h-10 w-7">
                <MdEdit className="text-xl" />
              </SheetTrigger>

              <SheetContent>
                <EditFile
                  id={data?.id}
                  description={data?.description}
                  title={data?.title}
                  snippet={data?.code}
                />
              </SheetContent>
            </Sheet>
            <Button variant={"ghost"} className="h-10 text-red-400 w-10">
              <Trash2 />
            </Button>

            <Button onClick={() => archiveMutation.mutate()} variant={"ghost"} className="h-10 w-10">
              <Archive />
            </Button>
          </div>
        </div>

        <div className="w-full p-6 overflow-y-scroll flex-1">
          {isLoading ? <p className="text-center">Loading....</p> : <></>}
          {data && (
            <>
              <h3 className="text-lg  text-primary/80">{data?.description}</h3>
              <div className="mt-5 bg-secondary/20 rounded-xl border-[1px]">
                <div className="p-4 flex-center justify-between">
                  <div className="text-sm flex-center gap-2 w-full">
                    <div className="flex-center gap-2 pr-4 h-full border-r-2">
                    <FaCircle className="text-green-500 text-[0.5rem]" />{" "}
                    <span className="font-semibold capitalize">{data?.language}</span>
               
                    </div>

                    <div className="flex-center font-semibold gap-2 text-zinc-400">
                      <span># {data?.version}</span>
                      <Badge>Latest</Badge>
                    </div>
                    <div className="ml-auto flex-center gap-2 text-zinc-400">
                      <FiClock/>
                      <p className="font-semibold">
                        {formatUnixDate(data?.updatedAt)}
                      </p>
                    </div>
                  </div>
                </div>
                <Separator />
                <div className="p-4">
                  <SyntaxHighlighter
                    customStyle={{ background: "transparent" }}
                    style={docco}
                    language={data.language}
                  >
                    {data?.code}
                  </SyntaxHighlighter>
                </div>
              </div>

              <div className="my-4">
                <Timeline
                  history={data?.history}
                  language={data.language}
                />
              </div>
            </>
          )}
        </div>
      </div>
    )
  );
};

export default Content;
