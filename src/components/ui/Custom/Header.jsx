import React, { useEffect, useState } from "react";
import { Button } from "../button";
import { IoAdd } from "react-icons/io5";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";



function Header() {
  const users = JSON.parse(localStorage.getItem("user"));
  const [Opendialog, setOpendialog] = useState();


  useEffect(() => {
    console.log(users);
  }, [users]);

  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.log(error),
  });
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
        window.location.reload();
      });
  };

  return (
    <div className="p-3 shadow-md flex items-center justify-between px-5">
      <img src="/logo.svg" alt="Logo" />
      <div>
        {users ? (
          <div className="flex items-center gap-3">
            <a href="/create-trip" >
            <Button variant="outline" className="rounded-full">
            <IoAdd className="mr-1 text-sm font-extrabold" />
               Create Trip
            </Button>
            </a>
           
            <a href="/My-Trips">
            <Button variant="outline" className="rounded-full">
              My Trips
            </Button>
            </a>
           
          <Popover>
  <PopoverTrigger>
  <img
              src={users?.picture}
              alt="User Profile"
              className="w-10 h-10 rounded-full border border-gray-300 object-cover"
            />
  </PopoverTrigger>
  <PopoverContent>
    <h2 className="cursor-pointer" onClick={()=>{
      googleLogout();
      localStorage.clear();
      window.location.reload();
    }}>Logout</h2>
  </PopoverContent>
</Popover>

          </div>
        ) : (
          <Button onClick={()=>setOpendialog(true)}>Sign In</Button>
        )}
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

export default Header;
