import { Button } from '@/components/ui/button';
import React, { useEffect, useState } from 'react';
import { IoIosSend } from 'react-icons/io';
import axios from 'axios';

const UNSPLASH_ACCESS_KEY = import.meta.env.VITE_UNSPLASH_API_KEY; // Replace with your Unsplash API key

function Infosection({ trip }) {
  const [placeImage, setPlaceImage] = useState('/placeholder.jpg'); // Default image

  // Fetch place image from Unsplash
  useEffect(() => {
    if (trip?.userSelection?.location?.label) {
      const fetchPlaceImage = async () => {
        try {
          const response = await axios.get('https://api.unsplash.com/search/photos', {
            params: {
              query: trip.userSelection.location.label,
              client_id: UNSPLASH_ACCESS_KEY,
              per_page: 1
            }
          });
          
          if (response.data.results.length > 0) {
            setPlaceImage(response.data.results[0].urls.regular); // Set the fetched image URL
          } else {
            setPlaceImage('/placeholder.jpg'); // Fallback to default image if no result
          }
        } catch (error) {
          console.error('Error fetching image from Unsplash:', error);
          setPlaceImage('/placeholder.jpg'); // Fallback to default image on error
        }
      };

      fetchPlaceImage();
    }
  }, [trip]);

  return (
    <div>
      <img className="h-[340px] w-full object-cover object-bottom rounded-xl" src={placeImage} alt={trip?.userSelection?.location?.label} />
      <div className="flex justify-between items-center">
        <div className="my-5 flex flex-col gap-2">
          <h1 className="text-2xl font-bold">{trip?.userSelection?.location?.label}</h1>
          <div className="flex gap-5">
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-sm md:text-md">📅 {trip.userSelection?.days} Day</h2>
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-sm md:text-md">💸 {trip.userSelection?.budget} Budget</h2>
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-sm md:text-md">🥂  No. of Traveler: {trip.userSelection?.traveller}</h2>
          </div>
        </div>
        <Button><IoIosSend className="text-xl" /></Button>
      </div>
    </div>
  );
}

export default Infosection;
