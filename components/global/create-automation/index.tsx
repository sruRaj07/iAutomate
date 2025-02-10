'use client'

import { Button } from '@/components/ui/button'
import { useCreateAutomation } from '@/hooks/use-automations'
import { AutomationDuoToneWhite } from '@/icons'
import { v4 } from 'uuid'
import Loader from '../loader'
import { useMemo } from 'react'

type Props={}

const CreateAutomation = (props:Props) => {
    const mutationId = useMemo(() => v4(), [])
    //WIP:Create the Automation in the Database using Mutate

    console.log(mutationId)
    const { isPending, mutate } = useCreateAutomation(mutationId)
    

    return (
        <Button className="lg:px-10 py-6 bg-gradient-to-br hover:opacity-80
           rounded-full from-[#3352CC] font-medium to- [#1C2D70]"
           onClick={() => 
            mutate({ 
                name: 'Untitled', 
                id: mutationId, 
                createdAt: new Date(),
                keywords: [],
            })
        }
           >
           <Loader state={isPending}>
            <AutomationDuoToneWhite />
            <p className="lg:inline hidden">Create an Automation</p>
           </Loader>
        </Button>
    )
}

export default CreateAutomation