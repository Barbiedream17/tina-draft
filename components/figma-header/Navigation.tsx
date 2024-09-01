/**
 * This code was generated by Builder.io.
 */
import React from "react";
import NavItem from "./NavItem";

const Navigation: React.FC = () => (
  <nav className="flex flex-col grow shrink items-center self-stretch my-auto bg-black min-w-[240px] w-[1095px] max-md:max-w-full">
    <div className="flex flex-wrap gap-1 justify-center items-end pr-80 pl-40 w-full max-w-[1171px] max-md:px-5 max-md:max-w-full">
      <NavItem text="Shop" hasDropdown />
      <NavItem text="Lash Guide" />
      <NavItem text="Lash Quiz" />
      <NavItem text="Apply + Care" hasDropdown />
    </div>
  </nav>
);

export default Navigation;
