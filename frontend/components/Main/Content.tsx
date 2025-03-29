"use client";
import { Archive, EllipsisVertical, Trash2 } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAtom } from "jotai";
import currentSnippetAtom from "@/atoms/currentSnippet";
import { HTTPRequest } from "@/api/api";
import { useQuery } from "@tanstack/react-query";
import { Snippet } from "@/types/snippet.type";
import { Badge } from "../ui/badge";
import SyntaxHighlighter from 'react-syntax-highlighter';
import docco from 'react-syntax-highlighter/dist/esm/styles/hljs/agate'

const Content = () => {
  const [currentSnip] = useAtom(currentSnippetAtom);
  const fetchSnip = async () => {
    const res = await HTTPRequest(`/snippet/${currentSnip}`, {}, "GET");
    if (res?.response.success) {
      return res.response.message;
    } else {
      return null;
    }
  };

  const { data, isLoading } = useQuery<Snippet | null>({
    queryKey: ["snipet", currentSnip],
    enabled: currentSnip !== null,
    queryFn: fetchSnip,
  });

  console.log("Current snippet ID:", currentSnip);
  console.log("Query is enabled:", currentSnip !== null);

  return (
    <div className="col-span-2">
      <div className="p-4 flex  items-center h-[80px] flex-row gap-4 border-b-2">
        <div className="flex gap-2">
          <Button variant={"ghost"} className="h-10 w-10">
            <Archive />
          </Button>
          <Button variant={"ghost"} className="h-10 w-10">
            <Trash2 />
          </Button>
        </div>

        <div className="ml-auto">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <EllipsisVertical />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Billing</DropdownMenuItem>
              <DropdownMenuItem>Team</DropdownMenuItem>
              <DropdownMenuItem>Subscription</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="w-full h-full p-6">
        {isLoading ? <p className="text-center">Loading....</p> : <></>}
        {data && (
          <>
            <h2 className="text-2xl font-semibold">{data?.title}</h2>
            <h3 className="text-lg  text-primary/80">{data?.description}</h3>
            <div className="mt-5 bg-secondary/70 rounded-xl border-[1px]">
              <div className="bg-background p-4 flex-center justify-between">
                <p className="text-sm">
                  {new Date(data.updatedAt * 1000).toUTCString()}
                </p>
                <Badge>{data.language}</Badge>
              </div>
              <div className="p-4">
                <SyntaxHighlighter customStyle={{background:"transparent"}} style={docco} language = {data.language}>
                {data?.code}
                </SyntaxHighlighter>
              
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Content;
