import React from 'react'

import { SelectTravelesList } from '../_data/groupSizeOptions'



type GroupSizeUiProps = {
  onSelectOption: (value: string) => void
}

const GroupSizeUi = ({ onSelectOption }: GroupSizeUiProps) => {
  return (
    <div className='grid grid-cols-2 md:grid-cols-4 gap-2 items-center mt-2'>
      {SelectTravelesList.map((item,index) =>(
        <div
          key={index}
          className='p-3 border rounded-2xl bg-white hover:border-primary cursor-pointer'
          onClick={() => onSelectOption(`${item.title}: ${item.people}`)}
        >
            <h2>{item.icon}</h2>
            <h2>{item.title}</h2>
        </div>
      ))}
    </div>
  )
}

export default GroupSizeUi
