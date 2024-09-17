import { StrictMode } from 'react'
import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter, createBrowserRouter, RouterProvider } from 'react-router-dom'
import CreateTrip from './Create-trip/index.jsx'
import Header from './components/ui/Custom/Header.jsx'
import { Toaster } from './components/ui/sonner.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google'
import viewtrip from './view-trip/[tripid]/index.jsx'
import Viewtrip from './view-trip/[tripid]/index.jsx'
import Mytrip from './my-trips/Mytrip.jsx'
const router=createBrowserRouter([


  {
    path: "/",
    element:<App/>
  },
  {
    path:"/create-trip",
    element:<CreateTrip/>

  },
  {
    path:"/view-trip/:tripid",
    element:<Viewtrip/>
  },
  {
    path:"/My-Trips",
    element:<Mytrip/>
  }


])

createRoot(document.getElementById('root')).render(
 
 <React.StrictMode>
        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>
  <Header/>
  <Toaster />

  <RouterProvider router={router}/>
  </GoogleOAuthProvider>
 </React.StrictMode>
)
