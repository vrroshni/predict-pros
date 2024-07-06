import { Loader2 } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

const Loader = () => {
    return (

       
            <div className='h-full flex flex-col gap-y-1 items-center justify-center '>
                <div>
                    <Loader2 className='animate-spin' size={30}/>
                </div>
                <p className='text-sm text-muted-foreground '>
                    Predicting our pro......
                </p>
            </div>
  


    )
}

export { Loader }
