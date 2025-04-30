"use client";
import React, { useRef } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
} from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { HTTPRequest } from "@/api/api";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const FormSchema = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .min(1, "Name is required"),
  colour: z
    .string({ required_error: "Language Required" })
    .min(1, "Colour is requried"),
});

const CreateLabelForm = () => {
  const colorPickerRef = useRef<HTMLInputElement>(null);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      colour: "#fff",
    },
  });
  const queryClient = useQueryClient();

  const onSubmit = async () => {
    const values = form.getValues();
    const isValid = await form.trigger();

    if (isValid) {
      const data = await HTTPRequest(
        "/label/create",
        { body: JSON.stringify({ name: values.name, colour: values.colour }) },
        "POST"
      );
      if (data?.response.success) {
        queryClient.invalidateQueries({ queryKey: ["labels"] });
        toast.success("Label Created");
      } else {
        console.log(data?.response.message);
        toast.error("Error in creating label");
      }
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button type="button">Create New</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Label</DialogTitle>
          <DialogDescription>
            Provide name and colour for your new label.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="flex flex-col mt-5">
                  <FormLabel className="form-label">Name</FormLabel>
                  <FormControl>
                    <Input
                      className=" input-primary h-[40px] text-[1rem]"
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
              name="colour"
              render={({ field }) => (
                <FormItem className="flex flex-col mt-5">
                  <FormLabel className="form-label">Colour</FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-2">
                      {/* Color preview box */}
                      <div
                        className="w-8 h-8 rounded border"
                        style={{ backgroundColor: field.value || "#ffffff" }}
                      />

                      {/* Hidden color input */}
                      <input
                        type="color"
                        ref={colorPickerRef}
                        value={field.value}
                        onChange={(e) => field.onChange(e.target.value)}
                        className="hidden"
                      />

                      {/* Text input */}
                      <Input
                        className="input-primary h-[40px] text-[1rem] cursor-pointer"
                        type="text"
                        value={field.value}
                        onClick={() => colorPickerRef.current?.click()}
                        onChange={(e) => field.onChange(e.target.value)}
                        placeholder="#ffffff"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="mt-6 flex justify-between">
              <DialogClose asChild>
                <button type="button" className="btn-secondary">
                  Cancel
                </button>
              </DialogClose>
              <DialogClose asChild>
                <Button type="button" onClick={onSubmit} className="rounded-sm">
                  Create
                </Button>
              </DialogClose>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateLabelForm;
