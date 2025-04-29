import {
  BoltIcon,
  ChevronDownIcon,
  LogOutIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAtom } from "jotai";
import userAtom from "@/atoms/user.atom";
import { HTTPRequest } from "@/api/api";
import BreadCrumbAtom from "@/atoms/breadcrumb.atom";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function ProfileDropDown() {
  const router = useRouter();
  const [, setBreadCrumb] = useAtom(BreadCrumbAtom);
  const signOut = async () => {
    const data = await HTTPRequest("/auth/signout", {}, "POST");
    if (data?.response.success) {
      setBreadCrumb([]);
      toast.success(data?.response.message);
      router.push("/auth");
    } else {
      toast.error(data?.response.message);
    }
  };
  const [user] = useAtom(userAtom);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="hover:bg-secondary">
        <Button variant="ghost" className="h-auto w-full">
          <div className="p-2 h-full bg-secondary flex-hard-center items-center text-xl  rounded-lg">
            {(user && user?.firstname[0] + user?.lastname[0]) || "User"}
          </div>
          <div className="flex flex-col items-start">
            <h5 className="text-md font-semibold max-w-[20ch] truncate">
              {" "}
              {(user && user?.firstname + " " + user?.lastname) || "User"}{" "}
            </h5>
            <p className="text-xs max-w-[20ch] truncate">{user?.email}</p>
          </div>
          <ChevronDownIcon
            size={16}
            className="opacity-60 ml-auto"
            aria-hidden="true"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-full">
        <DropdownMenuLabel className="flex min-w-0 flex-col">
          <span className="text-foreground truncate text-sm font-medium">
            {(user && user?.firstname + " " + user?.lastname) || "User"}{" "}
          </span>
          <span className="text-muted-foreground truncate text-xs font-normal">
            {user?.email}
          </span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <BoltIcon size={16} className="opacity-60" aria-hidden="true" />
            <span>Settings</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={ () => signOut()}>
          <LogOutIcon size={16} className="opacity-60" aria-hidden="true" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
