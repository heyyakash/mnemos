"use client";

import React from "react";
import {
  SheetClose,
  SheetContent,
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
import { useAtom } from "jotai";
import BreadCrumbAtom from "@/atoms/breadcrumb.atom";
import { HTTPRequest } from "@/api/api";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Separator } from "../ui/separator";
import { Code2 } from "lucide-react";
import CreateLabelForm from "../CreateLabelForm";
import { fetchLabels } from "../sidebar/Labels";
import { Label } from "@/types/label.type";

const FormSchema = z.object({
  title: z.string().min(1, "Snippet Name is required"),
  language: z.string().min(1, "Language is required"),
  snippet: z.string().min(1, "Code is required"),
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

  const { data: labels } = useQuery<Label[]>({
    queryKey: ["labels"],
    queryFn: fetchLabels,
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    const { title: name, language, snippet, label } = data;
    const parent_id = breadCrumb[breadCrumb.length - 1].id;

    const res = await HTTPRequest(
      "/snippet/create",
      {
        body: JSON.stringify({
          name,
          description: "test snippet",
          language,
          snippet,
          label,
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
    form.reset({
      title: "",
      language: "",
      snippet: "",
      label: "",
    });
    form.resetField("title");
    form.resetField("language");
    form.resetField("snippet");
    form.resetField("label");
  };

  return (
    <>
      <SheetContent className="w-full sm:max-w-md md:max-w-lg">
        <SheetHeader>
          <SheetTitle>Add new Snippet</SheetTitle>
          <SheetDescription>
            Save a code snippet for future reference.
          </SheetDescription>
          <SheetClose />
        </SheetHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="flex flex-col mt-5">
                  <FormLabel className="form-label">Snippet Name</FormLabel>
                  <FormControl>
                    <Input
                      className="input-primary h-[40px] text-[1rem]"
                      type="text"
                      placeholder="Add a descriptive name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Separator className="my-6" />

            <FormField
              control={form.control}
              name="language"
              render={({ field }) => (
                <FormItem className="flex flex-col mt-3">
                  <FormLabel className="form-label">Language</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="input-primary">
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

            <FormField
              control={form.control}
              name="label"
              render={({ field }) => (
                <FormItem className="flex flex-col mt-6">
                  <FormLabel className="form-label">Select a label</FormLabel>
                  <div className="flex-center gap-2">
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="input-primary">
                          <SelectValue placeholder="Select a Label" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {labels?.map((l, i) => {
                          return (
                            <SelectItem
                              className="capitalize"
                              key={i}
                              value={l.id}
                            >
                              {l.name}
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                    <CreateLabelForm />
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* <CreateLabelForm /> */}

            <Separator className="my-6" />

            <FormField
              control={form.control}
              name="snippet"
              render={({ field }) => (
                <FormItem className="flex flex-col mt-3">
                  <FormLabel className="form-label">Code</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Code2 className="absolute left-3 top-3 h-5 w-5 text-zinc-500" />
                      <textarea
                        id="code"
                        placeholder="Paste your code here..."
                        className="flex min-h-32 w-full rounded-md border border-zinc-800 bg-zinc-900 px-10 py-3 text-sm text-zinc-100 font-mono placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-700 disabled:cursor-not-allowed disabled:opacity-50"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button className="my-6 w-full" type="submit">
              Save
            </Button>
          </form>
        </Form>
      </SheetContent>
    </>
  );
};

export default CreateNewFile;
