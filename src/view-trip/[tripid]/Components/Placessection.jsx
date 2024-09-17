import React, { useEffect, useState } from 'react';
import Placecarditem from './Placecarditem';

function Placessection({ trip }) {
  const [tripData, setTripData] = useState(null);

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

  return (
    <div>
      <h2 className='font-bold text-lg my-5'>Places to Visit</h2>
      <div>
        {tripData && Object.keys(tripData.itinerary).map((dayKey, dayIndex) => (
          <div key={`day-${dayIndex}`} className='my-4'>
            <h2 className='font-bold text-lg'>{`Day ${dayIndex + 1}`}</h2>
            <div className='grid md:grid-cols-2 gap-5'>
              {Object.keys(tripData.itinerary[dayKey]).map((timeOfDay, timeIndex) => (
                <div key={`time-${dayIndex}-${timeIndex}`} className='my-3'>
                  <h2 className='font-medium text-sm text-orange-400'>Time: {tripData.itinerary[dayKey][timeOfDay].time}</h2>
                  <Placecarditem place={tripData.itinerary[dayKey][timeOfDay]} totaltime={timeOfDay} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Placessection;
