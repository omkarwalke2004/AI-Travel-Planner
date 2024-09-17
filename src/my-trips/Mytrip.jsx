import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/server/Firebaseconfig';
import TripCardItem from './Components/TripCardItem';


function Mytrip() {
  const navigate = useNavigate();
  const[Usertrips,setUsertrips] = useState([]);


  useEffect(() => {
    GetUserTrips();
  }, []); 

  const GetUserTrips = async () => {
    const user = JSON.parse(localStorage.getItem('user')); 

    if (!user) {
      navigate('/');
      return;
    }
    setUsertrips([]);

    const q = query(collection(db, 'AITRIPS'), where('userEmail', '==', user.email));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      console.log(doc.id, ' => ', doc.data());
      setUsertrips((prev)=>{
        return [...prev, doc.data()]
      })
    });
  };

  return (
     <div className='sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10'>
      <h2 className='font-bold text-3xl'>My Trips</h2>

      <div className='grid grid-cols-2 md:grid-cols-3 mt-10 gap-5'>
        {Usertrips.map((trip,index)=>{
         return <TripCardItem trip={trip} />
        })}
      </div>
     </div>
    
  )
}

export default Mytrip;
