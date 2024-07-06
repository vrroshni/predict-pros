import { Heading } from '@/components/Heading'
import ProsProfilesList from '@/components/ProsProfilesList'
import { BotMessageSquare, User } from 'lucide-react'
import React from 'react'

const page = () => {
  return (

    <div>
      <Heading title='Our Pros'
        description='Pros found using PredictPros'
        icon={User}
        iconColor='text-violet-500'
        bgColor='bg-violet-500/10'
      />
      <div className='px-4 lg:px-8'>
        <ProsProfilesList />
      </div>
    </div>
  )
}

export default page
