import { TinaProvider, TinaCMS } from "tinacms";
import { useMemo } from 'react';
import Link from "next/link";
import React from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cms = useMemo(() => {
    const tinaCMSConfig = {
      clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
      branch: process.env.NEXT_PUBLIC_TINA_BRANCH || 
        process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF || 
        process.env.HEAD,
      token: process.env.TINA_TOKEN,
    };

    return new TinaCMS(tinaCMSConfig as any);
  }, []);

  return (
    <TinaProvider cms={cms}>
      <html lang="en">
        <body
          style={{
            margin: "3rem",
          }}
        >
          <header>
            <Link href="/">Home</Link>
            {" | "}
            <Link href="/posts">Posts</Link>
          </header>
          <main>{children}</main>
        </body>
      </html>
    </TinaProvider>
  );
}