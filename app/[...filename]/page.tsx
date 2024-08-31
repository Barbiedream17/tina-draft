import { ReactNode } from "react";
import ClientPage from "./client-page";
import client from "../../tina/__generated__/client";
import TinaWrapper from '../components/TinaWrapper';
import { TinaCMS } from "tinacms";
import { draftMode } from 'next/headers';

export async function generateStaticParams() {
  const pages = await client.queries.pageConnection();
  const paths = pages.data?.pageConnection?.edges?.map((edge) => ({
    filename: edge?.node?._sys.breadcrumbs,
  }));

  return paths || [];
}

export default async function Page({
  params,
}: {
  params: { filename: string[] };
}) {
  const { isEnabled } = draftMode();
  const pageData = await client.queries.page({
    relativePath: `${params.filename}.mdx`,
  });

  const tinaCms = new TinaCMS({
    enabled: isEnabled,
    clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID!,
    branch: process.env.NEXT_PUBLIC_TINA_BRANCH || 'main',
    token: process.env.TINA_TOKEN,
  } as any);

  return (
    <TinaWrapper client={tinaCms}>
      <ClientPage {...pageData} />
    </TinaWrapper>
  );
}