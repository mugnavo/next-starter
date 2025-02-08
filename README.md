# mugnavo/next-starter

Minimal Next.js starter based on [dotnize/tanstarter](https://github.com/dotnize/tanstarter).

- [Next.js 15](https://nextjs.org/) + [React 19](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/)
- [Drizzle ORM](https://orm.drizzle.team/) + PostgreSQL
- [Better Auth](https://www.better-auth.com/)
- [Prettier](https://prettier.io/) + [ESLint](https://eslint.org/) + [Husky](https://typicode.github.io/husky/)

## Getting Started

1. [Use this template](https://github.com/new?template_name=next-starter&template_owner=mugnavo) or clone this repository.

2. Install dependencies:

   ```bash
   pnpm install # npm install
   ```

3. Create a `.env` file based on [`.env.example`](./.env.example).

4. In your OAuth2 apps, set the callback/redirect URIs to `http://localhost:3000/api/auth/callback/<provider>` (e.g. http://localhost:3000/api/auth/callback/github).

5. Push the schema to your database with drizzle-kit:

   ```bash
   pnpm db push # npm run db push
   ```

   https://orm.drizzle.team/docs/migrations

6. Run the development server:

   ```bash
   pnpm dev # npm run dev
   ```

   The development server should be now running at [http://localhost:3000](http://localhost:3000).

   For other scripts, check the [package.json](./package.json#L5) file.
