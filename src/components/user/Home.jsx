import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className="h-screen flex justify-center items-center">
      <div className='text-center'>
      <span className="text-6xl font-bold  px-4 sm:px-10 md:px-20 lg:px-40 ">Write feedbacks on random things</span><br />
      <Link to="/feed" >
      <button className='mt-5 px-10 py-3 text-white text-bold bg-black border-white rounded-xl'>Feeds</button>
      </Link>
      
      </div>
    </div>
  )
}

export default Home