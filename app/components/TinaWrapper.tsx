'use client';

import React from 'react';
import { TinaProvider, TinaCMS } from "tinacms";

interface TinaWrapperProps {
  children: React.ReactNode;
  pageProps: any; // Adjust this type as needed
}

const TinaWrapper: React.FC<TinaWrapperProps> = ({ children, pageProps }) => {
  const cms = new TinaCMS({
    enabled: pageProps.preview,
    clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID!,
    branch: process.env.NEXT_PUBLIC_TINA_BRANCH || 'main',
    token: process.env.TINA_TOKEN,
  } as any);

  return (
    <TinaProvider cms={cms}>
      {children}
    </TinaProvider>
  );
};

export default TinaWrapper;