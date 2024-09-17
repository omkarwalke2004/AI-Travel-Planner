import { db } from '@/server/Firebaseconfig';
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner';
import Infosection from './Components/Infosection';
import Hotelssection from './Components/Hotelssection';
import Placessection from './Components/Placessection';
import Footer from './Components/Footer';

function Viewtrip() {
    const {tripid} = useParams();
    const [trip,settrip] = useState([]);
    useEffect(()=>{
      tripid&&GetTripData();
    },[tripid])
    console.log(tripid);

    const GetTripData=async()=>{
        const docref=doc(db,'AITRIPS',tripid);
        const docsnap=await getDoc(docref);
        if(docsnap.exists()){
            console.log('Document',docsnap.data());  
            settrip(docsnap.data());  
        }
        else{
            console.log("No such document");
            toast("No trip found!")
            
        }
    }
    
  return (
    <div className='p-10 md:px-20 lg:px-44 xl:px-56'>
      <Infosection trip={trip}/>
      <Hotelssection trip={trip}/>
      <Placessection trip={trip}/>
      <Footer trip={trip}/>
    </div>
  )
}

export default Viewtrip






















