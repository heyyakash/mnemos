"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
} from "@/components/ui/sidebar";
import { Button } from "./ui/button";
import SidebarCollapsible from "./sidebar/SidebarCollapsible";
import { Archive, Home, Languages, Tag } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { HTTPRequest } from "@/api/api";
import { User } from "@/types/user.type";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Skeleton } from "./ui/skeleton";
import { useAtom } from "jotai";
import userAtom from "@/atoms/user.atom";
import { useEffect } from "react";
import { Folder } from "@/types/folder.type";
import BreadCrumbAtom from "@/atoms/breadcrumb.atom";

export function AppSidebar() {
  const router = useRouter();
  const [user, setUser] = useAtom(userAtom)
  const [, setBreadCrumb] = useAtom(BreadCrumbAtom)



  const getUserData = async () => {
    const data = await HTTPRequest("/user", {}, "GET");
    if(data?.status === 302){
      router.push("auth")
      toast.error("Session expired")
      return null
    }
    return data?.response.message ?? null;
  };

  const getFolderData = async () => {
    const data = await HTTPRequest(`/file/folder_info/${user?.rootFolder}`, {}, "GET")
    return data?.response.message ?? null
  }

  const signOut = async () => {
    const data = await HTTPRequest("/auth/signout", {}, "POST");
    if (data?.response.success) {
      setBreadCrumb([])
      toast.success(data?.response.message);
      router.push("/auth");
    }     
    else {
      toast.error(data?.response.message);
    }
  };

  const {
    data,
    isLoading,
    isError,
  } = useQuery<User | null>({ queryKey: ["user"], queryFn: getUserData,});

  const {
    data: folderData,
  } = useQuery<Folder | null>({
    queryKey:["folder", user?.rootFolder],
    queryFn: getFolderData,
    enabled : !!user?.rootFolder
  })


  useEffect(()=>{
    if(data){
      setUser(data)
      setBreadCrumb([])
    }
  },[data, setUser,setBreadCrumb])

  useEffect(() => {
    if(folderData){
      setBreadCrumb((breadCrumb) => [...breadCrumb, folderData])
    }
  },[folderData, setBreadCrumb])

  const labels = [
    {
      name: "Script",
    },
    {
      name: "General",
    },
    {
      name: "Web",
    },
    {
      name: "cli",
    },
  ];
  const language = [
    {
      name: "Python",
    },
    {
      name: "Typescript",
    },
    {
      name: "Java",
    },
    {
      name: "Bash",
    },
  ];

  if (isError) return <>Some Error</>;
  return (
    <Sidebar>
      <SidebarHeader className="p-4 flex items-center h-[80] flex-row gap-4 border-b-2">
        {isLoading? (
        <>
          <div className="flex items-center space-x-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
        </>
        ) : (
        <>
          <div className="w-[50px] h-full bg-secondary flex items-center text-xl justify-center rounded-md">
            {(user && user?.firstname[0] + user?.lastname[0]) || "User"}
          </div>
          <div>
            <h5 className="text-xl font-xl font-bold">
              {" "}
              {(user && user?.firstname + " " + user?.lastname) ||
                "User"} &apos;s
            </h5>
            <p>Workspace</p>
          </div>
        </>
        )}
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Platform</SidebarGroupLabel>
          <SidebarMenu>
            <div className="w-full cursor-pointer p-2 flex items-center gap-2 text-md hover:bg-secondary rounded-sm">
              <Home /> Home
            </div>
            <div className="w-full cursor-pointer p-2 flex items-center gap-2 text-md hover:bg-secondary rounded-sm">
              <Archive /> Archived
            </div>
            <SidebarCollapsible title="Labels" list={labels}>
              <Tag />
            </SidebarCollapsible>
            <SidebarCollapsible title="Languages" list={language}>
              <Languages />
            </SidebarCollapsible>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-4">
        <Button variant={"secondary"}>Settings</Button>
        <Button onClick={() => signOut()} variant={"destructive"}>
          Sign out
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
