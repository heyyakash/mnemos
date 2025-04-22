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
import { Textarea } from "../ui/textarea";
import { HTTPRequest } from "@/api/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const FormSchema = z.object({
  title: z.string({ required_error: "Title is required" }),
  description: z.string({ required_error: "Description Required" }),
  snippet: z.string({ required_error: "Snippet required" }),
});

interface props {
  title: string;
  id: string;
  description: string;
  snippet: string;
}

const EditFile: React.FC<props> = ({ title, id, description, snippet }) => {
  const queryClient = useQueryClient();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: title || "",
      description,
      snippet,
    },
  });

  const updateSnippet = async (data: z.infer<typeof FormSchema>) => {
    const { title, description, snippet } = data;

    const res = await HTTPRequest(
      `/snippet/update/${id}`,
      {
        body: JSON.stringify({
          title,
          description,
          snippet,
        }),
      },
      "PUT"
    );

    if (res?.response.success) {
      toast.success(res.response.message);
    } else {
      toast.error(res?.response.message);
    }
  };

  const useUpdateMutation = () => {
    return useMutation({
      mutationFn: updateSnippet,
      onSuccess: () => {
        console.log("Success")
        queryClient.invalidateQueries({
          queryKey: ["snippet"],
        });
      },
    });
  };

  const updateMutation = useUpdateMutation();

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    updateMutation.mutate(data);
  };

  return (
    <>
      <SheetHeader>
        <SheetTitle>Edit Snippet</SheetTitle>
        <SheetDescription>Edit existing snippet</SheetDescription>
        <SheetClose />
      </SheetHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="flex flex-col mt-5">
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input
                    className="input-primary h-[40px] text-[1rem]"
                    type="text"
                    placeholder="Bash script"
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
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input
                    className="input-primary h-[40px] text-[1rem]"
                    type="text"
                    placeholder="Bash script"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="snippet"
            render={({ field }) => (
              <FormItem className="flex flex-col mt-3">
                <FormLabel>Snippet</FormLabel>
                <FormControl>
                  <Textarea
                    className="input-primary h-[140px] text-[1rem]"
                    placeholder={`print("Hello World")`}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button className="mt-2" type="submit">
            Save
          </Button>
        </form>
      </Form>
    </>
  );
};

export default EditFile;
