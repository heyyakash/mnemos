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




export function AppSidebar() {

  const router = useRouter()
  const getUserData = async () => {
    const data = await HTTPRequest("/user",{}, "GET")
    console.log(data?.response.message)
    return data?.response.message ?? null
  }

  const signOut = async () => {
    const data = await HTTPRequest("/auth/signout", {}, "POST")
    if(data?.response.success){
      toast.success(data?.response.message)
      router.push("/auth")
    }else{
      toast.error(data?.response.message)
    }
  }

  const {data : user , isLoading, isError} = useQuery<User | null>({queryKey:["user"], queryFn: getUserData})
  const labels = [
    {
      name: "Script",
      // colour: "#231231",
    },
    {
      name: "General",
      // colour: "#231231",
    },
    {
      name: "Web",
      // colour: "#231231",
    },
    {
      name: "cli",
      // colour: "#231231",
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

  if(isLoading){
    return <>Loading</>
  }
  if(isError) return  <>Some Error</>
  return (
    <Sidebar>
      <SidebarHeader className="p-4 flex items-center h-[80] flex-row gap-4 border-b-2">
        <div className="w-[50px] h-full bg-secondary flex items-center text-xl justify-center rounded-md">
          {user && user?.firstname[0] + user?.lastname[0] || "User"}
        </div>
        <div>
          <h5 className="text-xl font-xl font-bold">Akash Sharma&apos;s</h5>
          <p>Workspace</p>
        </div>
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
        <Button onClick={() => signOut()} variant={"destructive"}>Sign out</Button>
      </SidebarFooter>
    </Sidebar>
  );
}
