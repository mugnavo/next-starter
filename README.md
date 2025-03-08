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

4. Push the schema to your database with drizzle-kit:

   ```bash
   pnpm db push # npm run db push
   ```

   https://orm.drizzle.team/docs/migrations

5. Run the development server:

   ```bash
   pnpm dev # npm run dev
   ```

   The development server should be now running at [http://localhost:3000](http://localhost:3000).

## Issue watchlist

- https://github.com/shadcn-ui/ui/discussions/6714 - We're using the `canary` version of shadcn/ui for Tailwind v4 support.

## Auth

Better Auth is currently configured for OAuth with GitHub, Google, and Discord, but can be easily modified to use other providers.

If you want to use email/password authentication or change providers, update the [auth config](./lib/server/auth.ts#L42) and [signin page](./app/routes/signin.tsx) with your own UI. You can use [shadcn/ui login blocks](https://ui.shadcn.com/blocks/login) or [@daveyplate/better-auth-ui](https://better-auth-ui.com/) as a starting point.

## Goodies

#### Scripts

These scripts in [package.json](./package.json#L5) use **pnpm** by default, but you can modify them to use your preferred package manager.

- **`auth:generate`** - Regenerate the [auth db schema](./lib/server/schema/auth.schema.ts) if you've made changes to your Better Auth [config](./lib/server/auth.ts).
- **`db`** - Run drizzle-kit commands. (e.g. `pnpm db generate` to generate a migration)
- **`ui`** - The shadcn/ui CLI. (e.g. `pnpm ui add button` to add the button component)
- **`format`** and **`lint`** - Run Prettier and ESLint.

#### Utilities

- [`getAuthSession()`](./lib/server/auth.ts#L54) - Retrieves the session and user data. Can be used in server components, API route handlers, and server actions.
- [`authGuard(redirectUrl?: string)`](./lib/server/auth.ts#L69) - Same as `getAuthSession`, but redirects to the specified URL or unauthorized.tsx if the user is not authenticated.
- [`ThemeToggle.tsx`](./lib/components/ThemeToggle.tsx) - A simple component to toggle between light and dark mode. ([#7](https://github.com/dotnize/tanstarter/issues/7))

For more information, refer to the [Next.js documentation](https://nextjs.org/docs) and [dotnize/tanstarter readme](https://github.com/dotnize/tanstarter/blob/main/README.md), which this starter is based on.
