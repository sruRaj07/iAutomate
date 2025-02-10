import { cn } from '@/lib/utils'
import React from 'react'
import { Spinner } from './spinner'

type Props = {
    state: boolean  // identify the loader has to show the animation or not
    className? : string
    children : React.ReactNode
    color? : string
}

const Loader = ({state, className, children, color}:Props) => {
    return state? (
        <div className={cn(className)}>
            <Spinner color={color} />
        </div>
    ) : (
        children
    )
}

export default Loader

