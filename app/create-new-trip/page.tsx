import React from 'react'
import ChatBox from './_components/ChatBox'

const page = () => {
  return (
    <div className='grid grid-cols-1 md: grid-cols-2 gap-5'>
      <div className=''>
        {/* chatBox */}
          <ChatBox />
      </div>
      <div>
        {/* map */}
        map
      </div>
    </div>
  )
}

export default page
