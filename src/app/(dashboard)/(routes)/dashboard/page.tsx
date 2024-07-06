"use client"
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { tools } from '@/lib/data'
import { cn } from '@/lib/utils'
import { UserButton } from '@clerk/nextjs'
import { ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

const DashboardPage = () => {
  const router = useRouter()
  return (
    <div>
      <div className='mb-8 space-y-4'>
        <h2 className='text-2xl md:text-4xl font-bold text-center'>
          Lets Find Our Pros
        </h2>
        <p className='text-muted-foreground font-light text-sm md:text-lg text-center'>
          Lets find our pros without compromising on our core values
        </p>
      </div>
      <div className='px-4 md:px-20 lg:px-32 space-y-4'>
        {tools.map((tool) => (
          <Card
            onClick={() => router.push(tool.href)}
            key={tool.href}
            className='p-4 border-black/5 flex items-center justify-between hover:shadow-md transition cursor-pointer'
          >
            <div className='flex items-center gap-x-4'>
              <div className={cn('p-2 w-fit rounded-md', tool.bgColor)}>
                <tool.icon className={cn('w-8 h-8', tool.color)} />
              </div>
              <div className='font-semibold'>
                {tool.label}
              </div>
            </div>
            <ArrowRight />
          </Card>
        ))}
      </div>
    </div>
  )
}

export default DashboardPage
