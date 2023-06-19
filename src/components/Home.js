import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Header from './Header'

const Home = () => {
  return (
    <>
    <Header/>
     <div className='mt-48 flex justify-center'>
      <h1 className="text-3xl font-bold underline">HOME</h1><br/>
       
        </div>
    </>
  );
};
export default Home;
