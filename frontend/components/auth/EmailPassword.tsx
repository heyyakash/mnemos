"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { HTTPRequest } from "@/api/api";
import Link from "next/link";

const formSchema = z.object({
  email: z.string().min(2, {
    message: "Length of email address should be greater than 2",
  }),
  password: z.string().min(2).max(50),
});

const EmailPassword = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const res = await HTTPRequest(
      "/auth/signin",
      {
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
        },
      },
      "POST"
    );
    if (res?.response.success) {
      toast.success(res.response.message);
      router.push("/store/home");
    } else {
      toast.error(res?.response.message);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className=" w-[90%] mx-auto md:w-[450px]"
      >
        <div className="my-6">
          <h3 className=" text-4xl font-bold text-center">
            Login to your account
          </h3>
          <p className="text-md text-white/50 text-center mt-3">
            Enter your email and password to Login
          </p>
        </div>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="mt-4">
              <FormLabel className="">Email</FormLabel>
              <FormControl>
                <Input
                  className="input-primary h-[40px] text-[1rem]"
                  type="email"
                  placeholder="johndoe@gmail.com"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="mt-4">
              <FormLabel className="">Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  className="input-primary h-[40px] text-[1rem]"
                  placeholder="password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          size={"lg"}
          className="mt-6 mb-3 text-lg w-full"
          variant={"default"}
        >
          Login
        </Button>
        <br />
        <Link href="/forgotpassword" className=" cursor-pointer">
          Forgot Password ?
        </Link>
      </form>
    </Form>
  );
};

export default EmailPassword;
