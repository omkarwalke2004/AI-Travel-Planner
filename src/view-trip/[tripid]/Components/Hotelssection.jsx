import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const UNSPLASH_ACCESS_KEY = import.meta.env.VITE_UNSPLASH_API_KEY; // Replace with your Unsplash API key

function Hotelssection({ trip }) {
  const [tripData, setTripData] = useState(null);
  const [hotelImages, setHotelImages] = useState({}); // Store hotel images in an object

  useEffect(() => {
    // Parse tripdata if it's a string
    if (typeof trip?.tripdata === 'string') {
      try {
        setTripData(JSON.parse(trip.tripdata));
      } catch (error) {
        console.error('Failed to parse tripdata:', error);
      }
    } else {
      setTripData(trip?.tripdata);
    }
  }, [trip]);

  useEffect(() => {
    const fetchHotelImages = async () => {
      if (tripData?.hotelOptions) {
        const newHotelImages = {};
        
        // Fetch images for each hotel
        for (const hotel of tripData.hotelOptions) {
          try {
            const response = await axios.get('https://api.unsplash.com/search/photos', {
              params: {
                query: hotel.name, // Search by hotel name
                client_id: UNSPLASH_ACCESS_KEY,
                per_page: 1
              }
            });

            if (response.data.results.length > 0) {
              newHotelImages[hotel.name] = response.data.results[0].urls.regular; // Store the image URL by hotel name
            } else {
              newHotelImages[hotel.name] = '/placeholder.jpg'; // Use placeholder if no image found
            }
          } catch (error) {
            console.error('Error fetching image for hotel:', hotel.name, error);
            newHotelImages[hotel.name] = '/placeholder.jpg'; // Fallback on error
          }
        }

        setHotelImages(newHotelImages); // Update state with fetched images
      }
    };

    if (tripData) {
      fetchHotelImages();
    }
  }, [tripData]);

  return (
    <div>
      <h2 className='font-bold text-xl mt-5'>Hotel Recommendation</h2>

      <div className='grid grid-cols-2 md:grid-cols-3 gap-5 xl:grid-cols-4 mt-5'>
        {tripData?.hotelOptions?.map((item, index) => (
          <Link 
            to={'https://www.google.com/maps/search/?api=1&query=' + item.name + " ," + item.address} 
            target='_blank' 
            key={index}
          >
            <div className='hover:scale-105 transition-transform cursor-pointer p-3 bg-white shadow-md rounded-xl'>
              <img 
                src={hotelImages[item.name] || '/placeholder.jpg'} // Use the fetched image or placeholder
                alt={item.name} 
                className='rounded-xl object-cover h-48 w-full' 
              />
              <div className='my-2 flex flex-col gap-1'>
                <h3 className='font-bold text-lg'>{item.name}</h3>
                <p className='text-gray-500 text-sm'>📍 {item.address}</p>
                <p className='text-sm'>💰 {item.price}</p>
                <p className='text-sm'>Rating: {item.rating} ⭐</p>
                <p className='text-gray-600 text-sm'>{item.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Hotelssection;
