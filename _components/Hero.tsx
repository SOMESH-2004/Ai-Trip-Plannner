'use client'

import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Globe2, Landmark, Plane, Send } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

export const suggection = [
  {
    tital : 'Create New Trip' ,
    icon : <Globe2 className='text-blue-400 h-5 w-5'/>
  },
 {
    tital : 'inspire me where to go' ,
    icon : <Plane className='text-green-400 h-5 w-5'/>
  },
    {
    tital : 'Discover Hidden Gems' ,
    icon : <Landmark className='text-orange-500 h-5 w-5'/>
  },
    {
    tital : 'Adventure Destination' ,
    icon : <Globe2 className='text-yellow-400 h-5 w-5'/>
  }
]

function Hero() {
  const router = useRouter()
  const [prompt, setPrompt] = useState('')
  const onSend = (): void => {
    const value = prompt.trim()
    if (value) {
      router.push(`/create-new-trip?q=${encodeURIComponent(value)}`)
    } else {
      router.push('/create-new-trip')
    }
  }
  return (
    <div className='mt-20'>
       {/* content */}
       <div className='flex flex-col gap-3 font-mono'>
        <h1 className='font-bold text-3xl text-center'>Hey , I'm your personal <span className='text-primary-foreground bg-primary p-2 rounded-2xl'>Trip Planner</span></h1>
        <p className='text-xs text-center p-2 mask-linear-from-accent-foreground font-mono'>any were you want to go just ask me , I will manage the rest</p>
       </div>
       {/* Input-box */}
       <div className='flex items-center justify-center'>
        <div className='border rounded-2xl p-1 shadow relative w-[100vh] h-30 '>
          <Textarea 
          className=' h-30  bg-transparent border-none focus-visible:ring-0 shadow-none resize-none text-xs'
          placeholder='create a trip from shen ghat to nagthana'
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          />

          <Button onClick={onSend}
          size={'icon'} className='absolute bottom-3 right-3 active:scale-75'>
            <Send  className='h-4 w-4'/>
          </Button>
        </div>
       </div>
       {/* suggestion */}
        <div className='flex items-center justify-center'>
          {suggection.map((seggections,index) => (
            <div key={index} className='flex items-center gap-2 border rounded-full p-2 m-2 cursor-pointer hover:shadow hover:bg-gray-100'>
              {seggections.icon}
              <h2 className='text-xs font-mono'>{seggections.tital}</h2>
            </div>
          ))}
        </div>
    </div>
  )
}

export default Hero
