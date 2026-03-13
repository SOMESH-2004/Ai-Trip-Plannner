import Hero from '@/_components/Hero'
import PopularList from '@/_components/PopularList'

import { Button } from '@/components/ui/button'
import React from 'react'

const page = () => {
  return (
    <div className='flex flex-col justify-center gap-7 mt-10'>
     <Hero />
     <PopularList />  
    </div>
  )
}

export default page
