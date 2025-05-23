'use client';
import { useState } from 'react'

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
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { HTTPRequest } from '@/api/api'
import { RotateCw } from 'lucide-react'

const formSchema = z.object({
    email: z.string().min(2, {
        message: "Length of email address should be greater than 2"
    })
})



const MagicLinks = () => {
    const [sending, setSending] = useState(false)
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setSending(true)
        const res = await HTTPRequest(`/user/magic`, {body: JSON.stringify(values)}, "POST" )
        if(res?.response.success){
            toast.success(res.response.message)
        }else{
            toast.error(res?.response.message)
        }
        setSending(false)
    }

  return (
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className=" w-[90%] md:w-[450px] mx-auto">
        <div className="my-6">
            <h3 className=" text-4xl font-bold text-center">Login to your account</h3>
            <p className="text-md text-white/50 text-center mt-3">Enter your email and password to Login</p>
        </div>
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
        <Button type="submit" size={"lg"} className="mt-6 text-lg w-full" variant={"default"}>{sending ? (<RotateCw size={20} className='animate-spin' />) : ("Send Magic Link")}</Button>
    </form>
</Form>
  )
}

export default MagicLinks