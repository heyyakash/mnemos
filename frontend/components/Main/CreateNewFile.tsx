"use client";

import React from "react";
import {
  SheetClose,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Label } from "../ui/label";
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
import { Select, SelectContent, SelectTrigger, SelectValue,  SelectItem } from "../ui/select";

const FormSchema = z.object({
  title: z.string({ required_error: "Title is required" }),
  language: z.string({ required_error: "Language Required" }),
  snippet: z.string({ required_error: "Snippet required" }),
});

const CreateNewFile = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const languages = Object.values(Languages);

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    console.log(data);
  };

  return (
    <>
      <SheetHeader>
        <SheetTitle>Add new Snippet</SheetTitle>
        <SheetDescription>Add a new snippet</SheetDescription>
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
                    type="email"
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
                    {languages.map((l,i)=>{
                        return <SelectItem className="capitalize" key = {i} value={l}>{l}</SelectItem>
                    })}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </>
  );
};

export default CreateNewFile;
