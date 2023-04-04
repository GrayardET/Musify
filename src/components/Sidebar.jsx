import { useState } from "react";
import { NavLink } from "react-router-dom";
import { RiCloseLine } from "react-icons/ri";
import { logo } from '../assets';
import { links } from '../assets/constants';


const NavLinks = ({handleClick}) => (

  <div className="mt-10">
    {links.map((link) => (
      <NavLink end
        key={link.name}
        to={link.to}
        
        onClick={()=> handleClick && handleClick(item.name)}
        className="flex flex-row justify-start items-center text-sm ml-4 my-8 font-medium text-gray-400 hover:text-cyan-400"
      >
        <link.icon className="w-6 h-6 mr-2" />
        {link.name}
      </NavLink>
    ))}
  </div>
)

const Sidebar = () => {
  const[mobileMenuOpoen, setMobileMenuOpen] = useState(false);
  return(
    <>
      <div className="md:flex hidden flex-col w-[240px] pt-10 pb-10 bg-[#191624]">
        <img src={logo} alt="logo" className="w-full h-14 object-contain" />
        <NavLinks />
      </div>
    </>
  );
}


export default Sidebar;
