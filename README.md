# Welcome to React Router!

A modern, production-ready template for building full-stack React applications using React Router on Cloudflare with Assistant UI and Neon.

## Getting Started

### Wrangler CLI

Make sure you have the latest version of the wrangler CLI installed.

```bash
npm install -g wrangler
```

### Environment Variables

Create a `.env` file in the root of the project by copying the `example.env` file:

```bash
cp example.env .env
```

### Set up Neon

Sign up for a Neon account and create a new project: [Neon](https://neon.com/signup)

Enable Neon Auth, navigate to Configuration > Environment Variables > React and copy the variables to the `.env` file, replacing the placeholder values.

### Set up Assistant UI

Sign up for a Assistant UI account and create a new project: [Assistant UI](https://cloud.assistant-ui.com/)

From there, copy the project base URL and project slug and add them to the `.env` file. Optionally, you can also generate an API key and add it to the `.env` file. This is not required for the base setup of this template but useful for additional features.

### Model Provider Setup

This template uses Vercel's AI SDK and Assistant UI for model serving. The `example.env` file has OpenAI set as the provider. Other providers are also supported. Refer to the [AI SDK Providers documentation](https://ai-sdk.dev/docs/foundations/providers-and-models) for more information.

Create a new API key for your preferred provider and add it to the `.env` file.

```txt
OPENAI_API_KEY=your_openai_api_key
```

### Installation

Install the dependencies:

```bash
npm install
```

### Development

Start the development server with HMR:

```bash
npm run dev
```

Your application will be available at `http://localhost:5173`.

### Deploying Secrets

Then run the following command to sync the secrets from the `.env` file to Cloudflare:

```bash
wrangler secret bulk .env
```

## Previewing the Production Build

Preview the production build locally:

```bash
npm run preview
```

## Building for Production

Create a production build:

```bash
npm run build
```

## Deployment

Deployment is done using the Wrangler CLI.

To build and deploy directly to production:

```sh
npm run deploy
```

To deploy a preview URL:

```sh
npx wrangler versions upload
```

You can then promote a version to production after verification or roll it out progressively.

```sh
npx wrangler versions deploy
```

## Add Worker URL to Neon Auth Trusted Domains

After deploying to Cloudflare Workers for the first time, copy the URL of your app and add it to the Neon Auth trusted domains in your Neon project > Auth > Configuration > Domains section. This enables Neon Auth to redirect back to your app after authentication.

## Styling

This template comes with [Shadcn UI](https://ui.shadcn.com/) and [Tailwind CSS](https://tailwindcss.com/) already configured for a simple default starting experience. You can use whatever CSS framework you prefer.

---

Built with ❤️ using React Router.
