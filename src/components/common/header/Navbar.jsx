import logo from '../../../assets/logo.png';
import { FaUser } from "react-icons/fa";
import { IoHome } from "react-icons/io5";
import { RiQuillPenFill } from "react-icons/ri";

function Navbar() {
  return (
    <>
      <div className="fixed top-0 left-0 w-full bg-blue-100 shadow-lg z-50">
        <div className="flex justify-between items-center px-4 sm:px-10 md:px-20 lg:px-40 flex-wrap">
          <div className="logo">
            <img className="w-20 sm:w-20" src={logo} alt="Logo" />
          </div>
          <div className="menu my-auto">
            <ul className="list-none inline-flex gap-4 sm:gap-6 md:gap-8 lg:gap-10">
              <li className="text-xl sm:text-xl md:text-2xl lg:text-2xl mt-2"><IoHome /></li>
              <li className="text-xl sm:text-xl md:text-2xl lg:text-2xl mt-2"><RiQuillPenFill /></li>
              <li className="text-xl sm:text-xl md:text-2xl lg:text-2xl mt-2"><FaUser /></li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
