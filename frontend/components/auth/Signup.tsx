"use client";
import React from 'react'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"



const formSchema = z.object({
    firstname: z.string().min(1).max(50),
    lastname: z.string().min(1).max(50),
    email: z.string().min(2, {
        message: "Length of email address should be greater than 2"
    }),
    password: z.string().min(2).max(50)
})


import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from 'sonner'
import { HTTPRequest } from '@/api/api'
import { useRouter } from 'next/navigation'


const SignUp = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstname:"",
            lastname:"",
            email: "",
            password: ""
        },
    })
    const router = useRouter()
    
    async function onSubmit(values: z.infer<typeof formSchema>) {
        const payload = {
            firstname:values.firstname,
            lastname: values.lastname,
            email:values.email,
            password:values.password
        }
        const res = await HTTPRequest("/auth/signup", {
            body: JSON.stringify(payload),
            headers:{
                "Content-Type":"application/json",
            }
        },"POST")
        
        if(res?.response.success){
            console.log(res.response)
            toast.success("You have signed up successfully!!")
            form.reset({
                firstname:"",
                lastname:"",
                email:"",
                password:""
            })
            router.push('/store/home')
        }else{
            toast.error(res?.response.message)
        }
        
    }


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-[90%] md:w-[450px] ">
                <div className="my-6">
                    <h3 className=" text-4xl font-bold text-center">Create an account</h3>
                    <p className="text-lg text-white/50 text-center mt-3">Enter your email and password to sign up</p>
                </div>


                <FormField
                    control={form.control}
                    name="firstname"
                    render={({ field }) => (
                        <FormItem className='mt-4'>
                            <FormLabel className="">Firstname</FormLabel>
                            <FormControl>
                                <Input className="input-primary h-[40px] text-[1rem]" type="text" placeholder="John" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="lastname"
                    render={({ field }) => (
                        <FormItem className='mt-4'>
                            <FormLabel className="">Lastname</FormLabel>
                            <FormControl>
                                <Input className="input-primary h-[40px] text-[1rem]" type="text" placeholder="Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem className='mt-4'>
                            <FormLabel className="">Email</FormLabel>
                            <FormControl>
                                <Input className="input-primary h-[40px] text-[1rem]" type="email" placeholder="johndoe@gmail.com" {...field} />
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
                                <Input type="password" className="input-primary h-[40px] text-[1rem]" placeholder="password" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" size={"lg"} className="mt-6 text-lg w-full" variant={"default"}>Sign up</Button>
            </form>
        </Form>
    )
}

export default SignUp