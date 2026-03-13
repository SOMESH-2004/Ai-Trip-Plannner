import React from 'react'

type CardProps = {
  image: string
  name: string
  description: string
}

const Card = ({ image, name, description }: CardProps) => {
  return (
    <div className='relative shadow-sm h-90 w-60 rounded-2xl shrink-0 bg-image bg-cover bg-center' style={{ backgroundImage: `url(${image})` }}>
      <div className='font-momo text-bold text-shadow-2xs text-white px-4 py-1 absolute bottom-0'>
        <h1 className='text-xl  font-bold'>{name}</h1>
        <p  >
            {description}
        </p>
        <button className='bg-blue-200 shadow m-4 py-1 px-4 font-bold rounded-full text-gray-700 active:bg-blue-400 active:scale-90'>
            review
        </button>
      </div>
    </div>
  )
}

export default Card
