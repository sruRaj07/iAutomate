import { SignIn } from '@clerk/nextjs'
import React from 'react'


type Props={}

const Page=(props:Props)=>{
    return <div className="h-screen w-screen flex justify-center items-center">
        <SignIn />
    </div>
}

export default Page