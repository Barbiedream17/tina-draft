'use client'

import { TinaProvider as BaseTinaProvider, TinaCMS } from "tinacms";
import { useMemo } from "react";

interface ExtendedTinaCMSConfig {
  enabled: boolean;
  clientId: string;
  branch: string;
  token: string;
  search?: {
    tina: {
      indexerToken?: string;
      stopwordLanguages?: string[];
    };
  };
}

export default function TinaProvider({ children }: { children: React.ReactNode }) {
  const cms = useMemo(() => {
    const config: ExtendedTinaCMSConfig = {
      enabled: true,
      clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID!,
      branch: process.env.NEXT_PUBLIC_TINA_BRANCH || 'main',
      token: process.env.TINA_CONTENT_TOKEN!,
      search: {
        tina: {
          indexerToken: process.env.TINA_SEARCH_TOKEN,
          stopwordLanguages: ['eng']
        }
      },
    };
    return new TinaCMS(config as any);
  }, []);

  return <BaseTinaProvider cms={cms}>{children}</BaseTinaProvider>;
}