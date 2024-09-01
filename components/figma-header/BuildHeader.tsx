'use client';

import React from "react";
import { useTina } from "tinacms/dist/react";
import TopBannerComponent from "./TopBanner";
import Logo from "./Logo";
import Navigation from "./Navigation";
import CurrencySelector from "./CurrencySelector";
import IconButton from "./IconButton";
import CartIcon from "./CartIcon";

// Define the shape of your header data
interface HeaderData {
  header: {
    topBannerText?: string;
    searchIconAlt?: string;
    searchIconSrc?: string;
    userIconAlt?: string;
    userIconSrc?: string;
  };
}

const BuildHeader: React.FC = () => {
  const { data } = useTina<HeaderData>({
    query: `#graphql
      query GetHeader {
        header(relativePath: "header.mdx") {
          topBannerText
          searchIconAlt
          searchIconSrc
          userIconAlt
          userIconSrc
        }
      }
    `,
    variables: {},
    data: { header: {} } as HeaderData,
  });

  const headerContent = data.header || {};

  return (
    <header className="flex flex-col">
      <TopBannerComponent text={headerContent.topBannerText || ''} />
      <div className="flex flex-wrap items-center w-full bg-black max-md:max-w-full">
        <Logo />
        <Navigation />
        <div className="flex grow shrink gap-5 self-stretch px-20 py-px my-auto min-w-[240px] w-[300px] max-md:px-5">
          <div className="flex gap-3 items-center">
            <CurrencySelector />
            <IconButton
              src={headerContent.searchIconSrc || ''}
              alt={headerContent.searchIconAlt || ''}
              width="21px"
              aspectRatio="square"
            />
            <IconButton
              src={headerContent.userIconSrc || ''}
              alt={headerContent.userIconAlt || ''}
              width="18px"
              aspectRatio="0.86"
            />
          </div>
          <CartIcon />
        </div>
      </div>
    </header>
  );
};

export default BuildHeader;