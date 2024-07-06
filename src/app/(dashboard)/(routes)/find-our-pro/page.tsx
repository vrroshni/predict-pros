import { BotMessageSquare } from 'lucide-react'
import React from 'react'
import { Heading } from '@/components/Heading'
import { FindPro } from '@/components/FindPro'

const FindourProHome = () => {

  return (
    <div>
      <Heading title='Find our Pros'
        description='Lets find our pros using PredictPros'
        icon={BotMessageSquare}
        iconColor='text-violet-500'
        bgColor='bg-violet-500/10'
      />
      <div className='px-4 lg:px-8'>
        <FindPro />
      </div>
    </div>
  )
}

export default FindourProHome



