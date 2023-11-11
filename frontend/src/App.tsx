
import { Routes, Route } from "react-router-dom";

import {
  Home,

} from "./_root/pages";

import AuthLayout from "./_auth/AuthLayout";
import RootLayout from "./_root/RootLayout";

import SignupForm from "./_auth/forms/SignupForm";
import SigninForm from "./_auth/forms/SigninForm";
import { Toaster } from "./components/ui/toaster";
//import { Toaster } from "@/components/ui/toaster";





const App = () => {
  return (
   <main className='flex h-screen bg-black'>
    <Routes>
        <Route element={<AuthLayout/>}>
            <Route path='/sign-in' element={<SigninForm/>} />
            <Route path='/sign-up' element={<SignupForm/>} />
        </Route>
       
        <Route element={<RootLayout/>}>
            <Route index element={<Home />}/>
            {/* <Route path="/explore" element={<Explore />}/>
            <Route path="/saved" element={<Saved />}/>
            <Route path="/create" element={<CreatePost/>}/>
            <Route path="/profile" element={<Profile />}/>
            <Route path="/edit-post" element={<EditPost />}/>
            <Route path="/details" element={<PostDetails />}/>
            <Route path="/update-profile" element={<UpdateProfile/>}/>
            <Route path="/all-users" element={<AllUsers />}/>  */}
        </Route> 
    </Routes>

    <Toaster />
   </main>
  )
}

export default App
