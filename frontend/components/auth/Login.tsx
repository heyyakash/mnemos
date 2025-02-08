"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import EmailPassword from './EmailPassword'
import MagicLinks from './MagicLink'


const Login = () => {


    return (
        <>
            <Tabs defaultValue="password" className="w-[90%] md:w-[450px]">
            <TabsContent value='password' className='w-full'><EmailPassword /></TabsContent>
            <TabsContent value='magiclink'><MagicLinks /></TabsContent>
                <TabsList className='w-full grid grid-cols-2 mt-10   '>
                    <TabsTrigger value="password">Password</TabsTrigger>
                    <TabsTrigger value="magiclink">Magic Link</TabsTrigger>
                </TabsList>
            </Tabs>

        </>
    )
}


export default Login
