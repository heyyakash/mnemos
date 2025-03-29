import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useAtom } from "jotai";
import BreadCrumbAtom from "@/atoms/breadcrumb.atom";

const BreadcrumbComponent = () => {
  const [breadCrumb, setBreadCrumb] = useAtom(BreadCrumbAtom);
  const handleBreadCrumbClick = (i:number) => {
    setBreadCrumb((breadCrumb) => breadCrumb.splice(0,i+1))
  }
  return (
    <Breadcrumb>
      <BreadcrumbList className="text-lg">
        {breadCrumb.map((link, index) => {
          return (
            <div key={index} className="flex-center gap-2">
              <BreadcrumbItem>
                <BreadcrumbPage onClick={()=>handleBreadCrumbClick(index)} className={`${index===breadCrumb.length-1? "text-primary":"text-primary/70"} hover:text-primary`}>{link.name}</BreadcrumbPage>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
            </div>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default BreadcrumbComponent;
