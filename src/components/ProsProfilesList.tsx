"use client"
import React from 'react'
import { BentoGrid, BentoGridItem } from './BentoGrid'
import { CircleCheckBig, CircleX, User } from 'lucide-react'
import Image from 'next/image'
import { getCurrentUserProfiles } from '@/lib/openaiApis'
import { useUser } from '@clerk/nextjs'

const ProsProfilesList = () => {
    const { user } = useUser();
    const profiles = getCurrentUserProfiles(user?.id)


    return (
        <BentoGrid className="max-w-4xl">
            {
                profiles.length > 0 ?
                    profiles.map((item: any, i: number) => (
                        <BentoGridItem
                            key={i}
                            title={item.name}
                            description={item.profile}
                            header={<Skeleton />}
                            icon={item.isSelected ? <CircleCheckBig className="h-4 w-4 text-green-500" /> : <CircleX className="h-4 w-4 text-red-500" />}
                        // className={i === 3 || i === 6 ? "md:col-span-2" : ""}
                        />
                    )) :
                    <div className='flex items-center justify-center font-semibold  w-full'>
                        <h1 className='text-xl' >Profiles are not evaluated yet!</h1>
                    </div>
            }
            { }
        </BentoGrid>
    )
}

export default ProsProfilesList


const Skeleton = () => (
    <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-[#E4E6E7]  dark:from-neutral-900 dark:to-neutral-800 relative ">
        <Image src={"/dummy.webp"} fill alt='Profile pic' className='object-contain' />
    </div>
);

const items = [
    {
        title: "Roshni V R",
        description: "FullStack Developer",
        header: <Skeleton />,
        icon: <User className="h-4 w-4 text-neutral-500" />,
    },
    {
        title: "The Digital Revolution",
        description: "Dive into the transformative power of technology.",
        header: <Skeleton />,
        icon: <User className="h-4 w-4 text-neutral-500" />,
    },
    {
        title: "The Art of Design",
        description: "Discover the beauty of thoughtful and functional design.",
        header: <Skeleton />,
        icon: <User className="h-4 w-4 text-neutral-500" />,
    },
    {
        title: "The Power of Communication",
        description:
            "Understand the impact of effective communication in our lives.",
        header: <Skeleton />,
        icon: <User className="h-4 w-4 text-neutral-500" />,
    },
    {
        title: "The Pursuit of Knowledge",
        description: "Join the quest for understanding and enlightenment.",
        header: <Skeleton />,
        icon: <User className="h-4 w-4 text-neutral-500" />,
    },
    {
        title: "The Joy of Creation",
        description: "Experience the thrill of bringing ideas to life.",
        header: <Skeleton />,
        icon: <User className="h-4 w-4 text-neutral-500" />,
    },
    {
        title: "The Spirit of Adventure",
        description: "Embark on exciting journeys and thrilling discoveries.",
        header: <Skeleton />,
        icon: <User className="h-4 w-4 text-neutral-500" />,
    },
];