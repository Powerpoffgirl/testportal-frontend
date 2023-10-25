import React, { useState } from 'react';

export default function Admin() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
      setIsSidebarOpen(!isSidebarOpen);
    };


  return (
    <>
    <div className="inset-y-0 left-0 z-50 flex-shrink-0" style={{width:'333px' , position:'fixed', backgroundColor: '#08DA75', color: 'white', transition: 'all 0.3s'}}>
      <div className={`h-full ${isSidebarOpen ? 'w-64' : 'w-16'} overflow-x-hidden`}>
        {/* Sidebar content goes here */}
        <div className='text-black absolute' style={{width:'184px', height:'39px', top:'35px', left:'30px', fontSize:'28px', fontWeight:600 , fontFamily: 'Kanit, sans-serif'}}>Welcome!</div>
      </div>
      {/* Hamburger Menu for Small Screens */}
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-50 p-2 text-white bg-gray-800 rounded-md focus:outline-none md:hidden"
      >
        {isSidebarOpen ? 
<></>:<></>
        }
      </button>
    </div>

{/* //header */}
<div className="fixed inset-x-0 top-0 z-50 flex-shrink-0 h-16 px-4 bg-customRed text-white flex items-center justify-end" style={{width:'1170px', left:'357px', height:'212px', borderRadius:'0px 0px 81px 0px'}}>
    {/* Add your header content here */}
    <div className="text-2xl font-bold">Header Content</div>
  </div>

    </>
  )
}
