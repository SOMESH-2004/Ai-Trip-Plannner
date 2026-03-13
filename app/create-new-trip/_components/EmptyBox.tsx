import { suggection } from '@/_components/Hero'
import React from 'react'

type EmptyBoxProps = {
  onSelectOption: (title: string) => void
}

const EmptyBox = ({ onSelectOption }: EmptyBoxProps) => {

  return (
    <div>
        <div className='mt-28'>
            <h1 className='font-bold text-2xl text-center '>start planning your <strong className='text-gray-500'>Trip</strong>  with AI </h1>
            <p className='text-center text-xs text-gray-400 mt-3 '>plan your dream vacation with power of AI ,discover personalized travel itinerarise</p>
        </div>
        <div>
            <div className='flex flex-col items-center justify-center mt-6'>
                {suggection.map((seggections,index) => (
                <div key={index} onClick={() => onSelectOption(seggections.tital)}
                 className='flex items-center gap-2 w-cover border rounded-full px-6 py-2 m-1.5 cursor-pointer hover:shadow hover:bg-gray-100'>
                {seggections.icon}
                <h2 className='text-xs font-mono'>{seggections.tital}</h2>
                </div>
            ))}
            </div>
        </div>
    </div>
    
  )
}

export default EmptyBox
