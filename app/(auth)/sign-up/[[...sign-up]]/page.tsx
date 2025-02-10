import { SignUp } from '@clerk/nextjs'


type Props={}

const Page=(props:Props)=>{
    return (
    <div className="h-screen w-screen flex justify-center items-center">
        <SignUp />
    </div>
   )
}

export default Page