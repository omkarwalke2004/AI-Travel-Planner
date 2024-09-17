import { Button } from '@/components/ui/button';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaMapLocationDot } from "react-icons/fa6"; 
import { ImLocation2 } from "react-icons/im";      
import { SiGooglemaps } from "react-icons/si";     
import axios from 'axios';

const UNSPLASH_ACCESS_KEY = import.meta.env.VITE_UNSPLASH_API_KEY; // Make sure to add this in your .env file

function Placecarditem({ place, totaltime }) {
  const [placeImage, setPlaceImage] = useState('/placeholder.jpg'); // Fallback to placeholder image

  useEffect(() => {
    // Fetch image from Unsplash API
    const fetchPlaceImage = async () => {
      try {
        const response = await axios.get('https://api.unsplash.com/search/photos', {
          params: {
            query: place.name, // Search based on the place's name
            client_id: UNSPLASH_ACCESS_KEY,
            per_page: 1
          }
        });

        if (response.data.results.length > 0) {
          setPlaceImage(response.data.results[0].urls.regular); // Set image to first result
        }
      } catch (error) {
        console.error('Error fetching image for place:', place.name, error);
      }
    };

    fetchPlaceImage();
  }, [place.name]);

  return (
    <Link 
      to={'https://www.google.com/maps/search/?api=1&query=' + place.name} 
      target='_blank' 
      className='block'
    >
      <div className='border border-gray-300 rounded-xl p-4 mt-3 flex gap-5 hover:scale-105 hover:shadow-lg transition-transform cursor-pointer bg-white'>
        <img 
          src={placeImage} 
          alt={place.name} 
          className='w-[100px] h-[100px] object-cover rounded-lg shadow-md' 
        />

        <div className='flex flex-col justify-between'>
          <div>
            <h2 className='font-semibold text-xl text-gray-800 leading-snug flex items-center'>
              {place.name} 
              <SiGooglemaps className='ml-2 text-blue-500' title="View on Google Maps" />
            </h2>
            <p className='text-sm text-gray-500 mt-1'>{place.details}</p>
          </div>

          <div className='mt-3 text-gray-600 text-sm flex flex-col gap-1'>
            <span className='flex items-center'><FaMapLocationDot className='mr-2 text-indigo-600' /> {totaltime}</span>
            <span className='flex items-center'><ImLocation2 className='mr-2 text-green-600' /> {place.ticketPricing}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default Placecarditem;
