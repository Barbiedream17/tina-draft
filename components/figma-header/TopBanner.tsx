import React from "react";

interface TopBannerProps {
  text: string;
}

const TopBanner: React.FC<TopBannerProps> = ({ text }) => (
  <header className="flex flex-col w-full text-xs tracking-wider leading-10 text-center text-black uppercase bg-red-100 max-md:max-w-full">
    <div className="flex flex-col items-center pr-5 w-full max-md:max-w-full">
      <div className="flex flex-col items-center w-full max-w-[1901px] max-md:max-w-full">
        <p>{text}</p>
      </div>
    </div>
  </header>
);

export default TopBanner;