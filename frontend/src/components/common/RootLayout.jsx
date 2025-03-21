import React from 'react'
import Header from "./Header";
import Footer from "./Footer";
import {Outlet} from "react-router-dom"
import {ClerkProvider} from "@clerk/clerk-react"

// Import your Publishable Key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}


function RootLayout() {
  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
    <div className=''>
      <Header/>
      <div className='' style={{minHeight:"90vh"}}>
        <Outlet  />
      </div>
      <Footer/>
    </div>
    </ClerkProvider>
  )
}

export default RootLayout