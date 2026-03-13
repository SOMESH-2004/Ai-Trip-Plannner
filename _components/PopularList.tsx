import React from 'react'
import Card from './Card'

const touristPlaces = [
  {
    name: "Eiffel Tower",
    image: "https://upload.wikimedia.org/wikipedia/commons/8/85/Tour_Eiffel_Wikimedia_Commons_%28cropped%29.jpg",
    description: "Iconic Paris landmark offering breathtaking city skyline views"
  },
  {
    name: "Taj Mahal",
    image: "https://images.unsplash.com/photo-1564507592333-c60657eea523",
    description: "White marble mausoleum symbolizing eternal love in India"
  },
  {
    name: "Great Wall of China",
    image: "https://images.unsplash.com/photo-1508804185872-d7badad00f7d",
    description: "Ancient massive wall stretching across mountains and valleys"
  },
  {
    name: "Statue of Liberty",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Front_view_of_Statue_of_Liberty_%28cropped%29.jpg/960px-Front_view_of_Statue_of_Liberty_%28cropped%29.jpg",
    description: "Symbol of freedom welcoming visitors to New York"
  },
  {
    name: "Machu Picchu",
    image: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29",
    description: "Ancient Incan city surrounded by dramatic mountain scenery"
  }
];

const PopularList = () => {
  return (
    <div>
      {/* PopularList */}
      <div className='px-6 py-4'>
        <h2 className='text-4xl font-bold text-center'>Discover Popular Trips </h2>
          <div className='flex gap-6 p-8 overflow-auto mx-30'>
            {touristPlaces.map((elem,idx) => (
              <Card image={elem.image} key={idx} name={elem.name} description={elem.description}/>
            ))}
          </div>
      </div>
    </div>
  )
}

export default PopularList
