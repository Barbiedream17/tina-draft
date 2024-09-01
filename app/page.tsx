import { client } from '../tina/__generated__/client'
import dynamic from 'next/dynamic';

const BuildHeader = dynamic(() => import('../components/figma-header/BuildHeader'), { ssr: false });

interface Post {
  title: string;
  _sys: {
    filename: string;
  };
}

export default async function Home() {
  let posts: Post[] = [];
  let error: string | null = null;

  try {
    const postsResponse = await client.queries.postConnection({
      first: 10, // Adjust this number as needed
    });

    posts = postsResponse.data?.postConnection?.edges?.map(edge => ({
      title: edge?.node?.title ?? 'Untitled',
      _sys: {
        filename: edge?.node?._sys?.filename ?? 'unknown',
      },
    })) ?? [];
  } catch (e) {
    console.error("Error fetching posts:", e);
    error = "Failed to fetch posts. Please try again later.";
  }

  return (
    <main>
      <BuildHeader />
      <h1>Welcome to my Tina CMS + Next.js site!</h1>
      {error ? (
        <p>{error}</p>
      ) : (
        <ul>
          {posts.map((post) => (
            <li key={post._sys.filename}>
              {post.title}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}