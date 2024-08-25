import React, { useState } from "react";
import { FaPlus } from "react-icons/fa6";

function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex justify-center items-center px-4 sm:px-10 md:px-20 lg:px-40 flex-wrap gap-2 pt-16 z-0">
      <div
        className="cursor-pointer shadow-lg h-[200px] w-[200px] mt-10 bg-slate-100 rounded-lg relative"
        onClick={handleOpenModal}
      >
        <FaPlus className="text-black absolute text-4xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
      </div>

     {isModalOpen && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div className="bg-white p-6 rounded-lg shadow-lg relative">
      <h2 className="text-xl font-bold mb-4">Enter feedback box name</h2>
      <input
        type="text"
        placeholder="Feedback Box Name"
        className="border border-gray-300 rounded-lg px-4 py-2 w-full mb-4"
      />
      <div className="flex justify-end space-x-4">
        <button
          onClick={handleCloseModal}
          className="bg-gray-500 text-white px-4 py-2 rounded-lg"
        >
          Close
        </button>
        <button
          onClick={()=>console.log("clicked")}
          className="bg-black text-white px-4 py-2 rounded-lg"
        >
          Submit
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
}

export default Dashboard;
