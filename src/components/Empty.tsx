import Image from 'next/image';
import React from 'react'

interface EmptyProps {
    label: string;
}
const Empty = ({ label }: EmptyProps) => {
    return (
        <div className='flex flex-col items-center justify-center'>
            <div className='relative h-72 w-72'>
                <Image alt='Empty' fill src={"/empty.webp"} />
            </div>
            <p className='text-muted-foreground text-sm text-center'>
                {label}
            </p>
        </div>
    )
}

export { Empty }
