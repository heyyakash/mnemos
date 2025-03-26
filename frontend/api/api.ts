/* eslint-disable @typescript-eslint/no-explicit-any */


export interface responseInterface {
    response: {
        message: any,
        success: boolean
    },
    status: number
}

export async function HTTPRequest(
    endpoint: string,
    options: any,
    method: string,
): Promise<responseInterface | null> {
    try {
        const base_url = process.env.NEXT_PUBLIC_BASE_URL as string
        const req = await fetch(base_url + endpoint, {
            method,
            credentials: "include",
            headers:{
                "Content-Type":"application/json"
            },
            ...options
        })
        const result = await req.json()
        return {
            response: result,
            status: req.status
        }
    } catch (err) {
        console.log(err)
        return null
    }
}