'use client';

import React from "react";
import { useTina, tinaField } from "tinacms/dist/react";
import TopBanner from "./TopBanner";
import Logo from "./Logo";
import Navigation from "./Navigation";
import CurrencySelector from "./CurrencySelector";
import IconButton from "./IconButton";
import CartIcon from "./CartIcon";

interface HeaderData {
  header: {
    topBannerText: string;
    searchIconAlt: string;
    searchIconSrc: string;
    userIconAlt: string;
    userIconSrc: string;
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
    data: {
      header: {
        topBannerText: "",
        searchIconAlt: "",
        searchIconSrc: "",
        userIconAlt: "",
        userIconSrc: "",
      }
    } as HeaderData,
  });

  const headerContent = data.header;

  return (
    <header className="flex flex-col">
      <TopBanner 
        text={headerContent.topBannerText} 
        data-tina-field={tinaField(data.header, 'topBannerText')}
      />
      <div className="flex flex-wrap items-center w-full bg-black max-md:max-w-full">
        <Logo />
        <Navigation />
        <div className="flex grow shrink gap-5 self-stretch px-20 py-px my-auto min-w-[240px] w-[300px] max-md:px-5">
          <div className="flex gap-3 items-center">
            <CurrencySelector />
            <IconButton
              src={headerContent.searchIconSrc}
              alt={headerContent.searchIconAlt}
              width="21px"
              aspectRatio="square"
              data-tina-field={tinaField(data.header, 'searchIconSrc')}
            />
            <IconButton
              src={headerContent.userIconSrc}
              alt={headerContent.userIconAlt}
              width="18px"
              aspectRatio="0.86"
              data-tina-field={tinaField(data.header, 'userIconSrc')}
            />
          </div>
          <CartIcon />
        </div>
      </div>
    </header>
  );
};

export default BuildHeader;