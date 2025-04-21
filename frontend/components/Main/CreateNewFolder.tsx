"use client";

import React from "react";
import {
  SheetClose,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useAtom } from "jotai";
import BreadCrumbAtom from "@/atoms/breadcrumb.atom";
import { HTTPRequest } from "@/api/api";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

const FormSchema = z.object({
  name: z.string({ required_error: "Title is required" }),
  description: z.string({ required_error: "Title is required" }),
});

const CreateNewFolder = () => {
  const queryClient = useQueryClient();
  const [breadCrumb] = useAtom(BreadCrumbAtom);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    const parent_id = breadCrumb[breadCrumb.length - 1].id;
    const name = data.name;
    const description = data.description;

    const res = await HTTPRequest(
      "/file/folder",
      { body: JSON.stringify({ parent_id, name, description }) },
      "POST"
    );
    if (res?.status === 200) {
      toast.success(res.response.message);
      queryClient.invalidateQueries({ queryKey: ["files"] });
    } else {
      toast.error(res?.response.message);
    }
  };

  return (
    <>
      <SheetHeader>
        <SheetTitle>Add new Snippet</SheetTitle>
        <SheetDescription>Add a new snippet</SheetDescription>
        <SheetClose />
      </SheetHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="flex flex-col mt-5">
                <FormLabel>Folder Name</FormLabel>
                <FormControl>
                  <Input
                    className="input-primary h-[40px] text-[1rem]"
                    type="text"
                    placeholder="Docker commands"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="flex flex-col mt-5">
                <FormLabel>Folder Short Description</FormLabel>
                <FormControl>
                  <Input
                    className="input-primary h-[40px] text-[1rem]"
                    type="text"
                    max={30}
                    placeholder="code for Docker commands"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="mt-3">
            Create New Folder
          </Button>
        </form>
      </Form>
    </>
  );
};

export default CreateNewFolder;
