import {Outlet, Navigate} from 'react-router-dom'
import SignupForm from './forms/SignupForm';

import cover from "../assets/images/cover.png";

const AuthLayout = () => {
  const isAuthenticated = false;
  return (
    <>
      {isAuthenticated ? (
        <Navigate to="/"/>

      ) : (
        <>
         <section className='flex flex-1 justify-center items-center flex-col '>
          <Outlet />
         </section>

         <img src={cover} alt="logo" className='hidden xl:block h-screen w-1/2 object-cover bg-no-repeat' />
        </>
      )}
    </>
  )
}

export default AuthLayout
