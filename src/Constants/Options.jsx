import { IoAirplane } from "react-icons/io5";
import { FaGlassCheers } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { GiFamilyHouse } from "react-icons/gi";
import { FaMoneyBillAlt } from "react-icons/fa";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";
import { BiMoneyWithdraw } from "react-icons/bi";
export const SelectTravelesList=[

    {
        id:1,
        title:'Just Me',
        desc:'A sole traveles in exploration',
        icons:<IoAirplane />,
        people:'1',
    },
    {
        id:2,
        title:'A Couple',
        desc:'Two traveles in tandem',
        icons:<FaGlassCheers/>,
        people:'2 People',
        
    },
    {
        id:3,
        title:'A Group',
        desc:'A group of friends and family',
        icons:<FaHome/>,
        people:'5-10 People',
    },
    {
        id:4,
        title:'A Family',
        desc:'A family on a mission',
        icons:<GiFamilyHouse/>,
        people:'6-8 People',
    }


]

export const SelectBudgetOptions=[

    {
        id:1,
        title:'Cheap',
        desc:'Stay conscious of costs',
        icon:<FaMoneyBillAlt/>
    },
    {
        id:2,
        title:'Moderate',
        desc:'Consider budget',
        icon:<RiMoneyRupeeCircleFill/>
    },
    {
        id:3,
        title:'Luxary',
        desc:'Be prepared for high costs',
        icon:<BiMoneyWithdraw/>
    },

]
export const AI_PROMPT='Generate Travel plan for location:{location},for {totaldays} Days for {travelers} with a {budget} budget, give me Hotels options list with HotelName, Hotel address, Price, hotel image url ,geo coordinates, rating, description and suggest itinerary with placeName, place details, place Image Url,Geo coordinates, ticket pricing,Time travel each of location for {totaldays} days with each day plan with best time to visit in JSON format'