This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Running the python server:
The [https://github.com/SrikarVasta/mapbackend](geodata) project needs to be run along with this project.

- Once running set the GEO_DATA_SERVER_URI=[server url] in `.env.local`;

## Genreral info:

- There's no auth implemented so it should work right off the bat.
- Choose the shapes from the side pannel and draw the shape.
- The api calls to the server is made through the nextjs api to keep the potentian auth creds private.
