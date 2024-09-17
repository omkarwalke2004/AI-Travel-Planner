import axios from 'axios';

const UNSPLASH_ACCESS_KEY = import.meta.env.VITE_UNSPLASH_API_KEY; // Get from your .env file

export const fetchPlacePhotos = async (placeName) => {
  try {
    const response = await axios.get('https://api.unsplash.com/search/photos', {
      params: {
        query: placeName,
        client_id: UNSPLASH_ACCESS_KEY
      }
    });
    return response.data.results;
  } catch (error) {
    console.error('Error fetching photos:', error);
    return [];
  }
};
