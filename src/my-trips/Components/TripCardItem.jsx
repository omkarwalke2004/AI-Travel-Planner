import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const UNSPLASH_ACCESS_KEY = import.meta.env.VITE_UNSPLASH_API_KEY;

function TripCardItem({ trip }) {
  const [imageUrl, setImageUrl] = useState('/placeholder.jpg'); // Default placeholder image

  useEffect(() => {
    const fetchImage = async () => {
      const location = trip?.userSelection?.location?.value; // Get location value

      if (location) {
        try {
          const response = await axios.get('https://api.unsplash.com/search/photos', {
            params: {
              query: location, // Use location value for the query
              client_id: UNSPLASH_ACCESS_KEY,
              per_page: 1
            }
          });

          if (response.data.results.length > 0) {
            setImageUrl(response.data.results[0].urls.regular); // Set the image URL from Unsplash
          } else {
            setImageUrl('/placeholder.jpg'); // Fallback to placeholder if no image is found
          }
        } catch (error) {
          console.error('Error fetching image from Unsplash:', error);
          setImageUrl('/placeholder.jpg'); // Fallback to placeholder on error
        }
      }
    };

    fetchImage();
  }, [trip]);

  return (
    <Link to={'/view-trip/' + trip?.id} >
        <div className="trip-card-item bg-white shadow-lg rounded-lg overflow-hidden transition transform hover:scale-105 hover:shadow-2xl">
      {/* Image Section */}
      <div className="relative">
        <img className="object-cover w-full h-48" src={imageUrl} alt={trip?.userSelection?.location?.label || 'Location Image'} />
      </div>

      {/* Trip Info Section */}
      <div className="p-4">
        <h2 className="font-bold text-xl text-gray-900 mb-2">{trip?.userSelection?.location?.label}</h2>
        <p className="text-sm text-gray-600">
          {trip?.userSelection?.days} Days trip with {trip?.userSelection?.budget} Budget
        </p>
      </div>
    </div>
    </Link>
  );
}

export default TripCardItem;
