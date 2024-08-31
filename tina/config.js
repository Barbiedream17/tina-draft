import { defineConfig } from "tinacms";

// Define your content model
const schema = {
  collections: [
    {
      name: "post",
      label: "Posts",
      path: "content/posts",
      fields: [
        {
          type: "string",
          name: "title",
          label: "Title",
          isTitle: true,
          required: true,
        },
        {
          type: "rich-text",
          name: "body",
          label: "Body",
          isBody: true,
        },
        {
          type: "datetime",
          name: "date",
          label: "Date",
        },
        {
          type: "boolean",
          name: "draft",
          label: "Draft",
        },
      ],
    },
    {
      name: "page",
      label: "Pages",
      path: "content/pages",
      fields: [
        {
          type: "string",
          name: "title",
          label: "Title",
          isTitle: true,
          required: true,
        },
        {
          type: "rich-text",
          name: "body",
          label: "Body",
          isBody: true,
        },
      ],
    },
  ],
};

export default defineConfig({
  branch: process.env.NEXT_PUBLIC_TINA_BRANCH || "main",
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  token: process.env.TINA_TOKEN,

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "uploads",
      publicFolder: "public",
    },
  },
  schema,

  // Preview mode configuration
  admin: {
    auth: {
      onLogin: async ({ token }) => {
        const secret = process.env.DRAFT_SECRET;
        window.location.href = `/api/enable-draft?token=${token.id_token}&slug=${window.location.pathname}&secret=${secret}`;
      },
      onLogout: async () => {
        window.location.href = `/api/disable-draft?slug=${window.location.pathname}`;
      },
    },
  },

  search: {
    tina: {
      indexerToken: process.env.TINA_SEARCH_TOKEN,
      stopwordLanguages: ['eng']
    },
    indexBatchSize: 100,
    maxSearchIndexFieldLength: 100
  },

  // Additional Tina configuration options
  cmsCallback: (cms) => {
    // Customize the CMS object here if needed
    return cms;
  },
});