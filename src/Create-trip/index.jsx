import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  AI_PROMPT,
  SelectBudgetOptions,
  SelectTravelesList,
} from "@/Constants/Options";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { toast } from "sonner";
import { chatSession } from "@/server/AImodel";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/server/Firebaseconfig";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate, useNavigation } from "react-router-dom";

const predefinedCities = [
  // Global Cities
  { label: "New York, USA", value: "New York" },
  { label: "Los Angeles, USA", value: "Los Angeles" },
  { label: "Paris, France", value: "Paris" },
  { label: "London, UK", value: "London" },
  { label: "Tokyo, Japan", value: "Tokyo" },
  { label: "Sydney, Australia", value: "Sydney" },
  { label: "Dubai, UAE", value: "Dubai" },
  { label: "Rome, Italy", value: "Rome" },
  { label: "Toronto, Canada", value: "Toronto" },
  { label: "Berlin, Germany", value: "Berlin" },
  { label: "Bangkok, Thailand", value: "Bangkok" },

  { label: "Mumbai, India", value: "Mumbai" },
  { label: "Delhi, India", value: "Delhi" },
  { label: "Bengaluru, India", value: "Bengaluru" },
  { label: "Kolkata, India", value: "Kolkata" },
  { label: "Chennai, India", value: "Chennai" },
  { label: "Hyderabad, India", value: "Hyderabad" },
  { label: "Jaipur, India", value: "Jaipur" },
  { label: "Goa, India", value: "Goa" },
  { label: "Agra, India", value: "Agra" },
  { label: "Ahmedabad, India", value: "Ahmedabad" },
  { label: "Pune, India", value: "Pune" },
  { label: "Udaipur, India", value: "Udaipur" },
];

function CreateTrip() {
  const [place, setPlace] = useState();
  const [form, setFormData] = useState({});
  const [flashMessage, setFlashMessage] = useState("");
  const [showFlash, setShowFlash] = useState(false);
  const [Opendialog, setOpendialog] = useState();
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();


  const handelinputchange = (name, value) => {
    if (name === "days" && value > 5) {
      setFlashMessage("The number of days cannot exceed 5!");
      setShowFlash(true);
      setTimeout(() => {
        setShowFlash(false);
      }, 3000);
    }
    setFormData({
      ...form,
      [name]: value,
    });
  };

  useEffect(() => {
    console.log(form);
  }, [form]);

  const ongenratetrip = async () => {
    const user = JSON.parse(localStorage.getItem("user")); // Ensure user is an object
    if (!user) {
      setOpendialog(true);
      return;
    }
    if (form?.days > 5 || !form?.location || !form?.budget || !form?.traveller) {
      toast("Please fill all the details.");
      return;
    }
  
    setloading(true);
    const Final_prompt = AI_PROMPT.replace("{location}", form?.location?.label)
      .replace("{totaldays}", form?.days)
      .replace("{budget}", form?.budget)
      .replace("{travelers}", form?.traveller)
      .replace("{totaldays}", form?.days);
  
    const result = await chatSession.sendMessage(Final_prompt);
    console.log(result?.response?.text());
    setloading(false);
    
    
    SaveAiTrip(result?.response?.text(), user);
  };
  
  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.log(error),
  });

  const SaveAiTrip = async (Tripdata, user) => { // Accept user as a parameter
    setloading(true);
    const docid = Date.now().toString();
    await setDoc(doc(db, "AITRIPS", docid), {
      userSelection: form,
      tripdata: (Tripdata),
      userEmail: user.email, // Using the user object here
      id: docid,
    });
    setloading(false);
    navigate('/view-trip/' + docid)
  };
  
  const GetUserProfile = (tokenInfo) => {
    axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?acess_token=${tokenInfo?.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo?.access_token}`,
            Accept: `Application/json`,
          },
        }
      )
      .then((resp) => {
        console.log(resp);
        localStorage.setItem("user", JSON.stringify(resp.data));
        setOpendialog(false);
        ongenratetrip();
      });
  };

  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10">
      <h2 className="font-bold text-3xl">
        Tell us your travel preferences🏡🌴
      </h2>
      <p className="text-gray-500 text-xl mt-3">
        Just provide some basic information, and our trip planner will generate
        a customized itinerary based on your preferences.
      </p>

      {showFlash && (
        <div className="bg-yellow-100 text-red-600 p-3 rounded-md my-5">
          {flashMessage}
        </div>
      )}

      <div>
        <div className="mt-20 flex flex-col gap-9">
          <div>
            <h2 className="text-xl font-medium my-3">
              What is the destination of choice?
            </h2>
            <GooglePlacesAutocomplete
              apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
              selectProps={{
                place,
                onChange: (v) => {
                  setPlace(v);
                  handelinputchange("location", v);
                },
              }}
            />
            <div className="mt-4">
              <h3 className="font-semibold mb-2">
                Or select from popular cities:
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {predefinedCities.map((city, index) => (
                  <button
                    key={index}
                    className="p-2 border rounded-md bg-white hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      setPlace(city);
                      handelinputchange("location", city);
                    }}
                  >
                    {city.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-medium my-3">
              How many days are you planning your trip?
            </h2>
            <Input
              placeholder={"Ex. 3"}
              type="number"
              onChange={(e) => handelinputchange("days", e.target.value)}
            />
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-medium my-3">What is Your Budget?</h2>
        <div className="grid grid-cols-3 gap-5 mt-5">
          {SelectBudgetOptions.map((item, index) => (
            <div
              key={index}
              onClick={() => handelinputchange("budget", item.title)}
              className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg ${
                form?.budget === item.title && "shadow-lg border-black"
              }`}
            >
              <h2 className="text-4xl">{item.icon}</h2>
              <h2 className="font-bold text-lg">{item.title}</h2>
              <h2 className="text-sm text-gray-500">{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-5">
        <h2 className="text-xl font-medium my-3">
          Who do you plan on traveling with on your next adventure?
        </h2>
        <div className="grid grid-cols-3 gap-5 mt-5">
          {SelectTravelesList.map((item, index) => (
            <div
              key={index}
              onClick={() => handelinputchange("traveller", item.people)}
              className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg ${
                form?.traveller === item.people && "shadow-lg border-black"
              }`}
            >
              <h2 className="text-4xl">{item.icons}</h2>
              <h2 className="font-bold text-lg">{item.title}</h2>
              <h2 className="text-sm text-gray-500">{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>

      <div className="my-10 flex justify-end">
        <Button
          disabled={loading}
          onClick={() => {
            return ongenratetrip();
          }}
        >
          {loading ? (
            <AiOutlineLoading3Quarters className="h-7 w-7 animate-spin" />
          ) : (
            "Generate Trip"
          )}
        </Button>
      </div>
      <Dialog open={Opendialog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <img src="./logo.svg" alt="" />
              <h2 className="font-bold text-lg mt-7">Sign In with Google</h2>
              <p>Sign in to the App with Google authentication security</p>
              <Button
                onClick={login}
                className="w-full mt-5 flex gap-4 items-center"
              >
                <FcGoogle className="w-7 h-7" />
                Sign In With Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreateTrip;
