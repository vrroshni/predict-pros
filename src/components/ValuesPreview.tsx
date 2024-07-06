import { X } from 'lucide-react';
import React from 'react'

interface ValuesPreviewProps {
    values:string[] ;
    removeValue: (value: string) => void;
}

const ValuesPreview = ({ values, removeValue }: ValuesPreviewProps) => {
    return (
        <div className='p-1 px-3 md:px-6  flex gap-2 flex-wrap flex-shrink mt-1 mb-5 w-full lg:w-3/4'>
        {
            values.map((value) => (
                <div key={value} className=' flex  w-fit gap-2 items-center bg-gray-300/30 rounded-md px-2 py-1 border text-sm hover:bg-gray-300/20'>
                    {value} <X size={16} className='cursor-pointer' onClick={()=>removeValue(value)}/>
                </div>
            ))
        }
    </div>
    )
}

export default ValuesPreview
