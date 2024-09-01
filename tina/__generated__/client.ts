import { createClient } from "tinacms/dist/client";
import { queries } from "./types";
export const client = createClient({ url: 'https://content.tinajs.io/1.5/content/90709387-5974-4e15-98e5-4276ee558339/github/main', token: '3eb9dc3e1d2b524b4e6bca0b04cb57445b85560d', queries,  });
export default client;
  