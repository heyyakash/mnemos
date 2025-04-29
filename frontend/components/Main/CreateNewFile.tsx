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
import Languages from "@/constants/languages";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { useAtom } from "jotai";
import BreadCrumbAtom from "@/atoms/breadcrumb.atom";
import { HTTPRequest } from "@/api/api";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import CreateLabelForm from "../CreateLabelForm";

const FormSchema = z.object({
  title: z.string({ required_error: "Title is required" }),
  language: z.string({ required_error: "Language Required" }),
  snippet: z.string({ required_error: "Snippet required" }),
  label: z.string(),
});

const CreateNewFile = () => {
  const [breadCrumb] = useAtom(BreadCrumbAtom);
  const queryClient = useQueryClient();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
      language: "",
      snippet: "",
      label: "",
    },
  });

  const languages = Object.values(Languages);

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    const { title: name, language, snippet } = data;
    const parent_id = breadCrumb[breadCrumb.length - 1].id;

    const res = await HTTPRequest(
      "/snippet/create",
      {
        body: JSON.stringify({
          name,
          description: "test snippet",
          language,
          snippet,
          parent_id,
        }),
      },
      "POST"
    );

    if (res?.response.success) {
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
            name="language"
            render={({ field }) => (
              <FormItem className="flex flex-col mt-3">
                <FormLabel>Language</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a language" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {languages.map((l, i) => {
                      return (
                        <SelectItem className="capitalize" key={i} value={l}>
                          {l}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <CreateLabelForm />

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

export default CreateNewFile;
