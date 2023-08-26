 # PayDog

### Стек:

- NextJS 13 (серверные компоненты имба)
- Tailwindcss
- Supabase (Serverless бэкенд Postgresql)

## Разворачивание

Создать проект в Supabase

В .env запихать токены

```
NEXT_PUBLIC_SUPABASE_URL=https://viazgenvxhxifrngevpp.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZpYXpnZW52eGh4aWZybmdldnBwIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTI4NzcwNDIsImV4cCI6MjAwODQ1MzA0Mn0.zuZ24NJTXhzjkRrSL0_YHo6DE-wEL9z2KJXMNusuyi4
```

Запустить npm run dev

## Как работает

Все страницы в директории /app/

Страницы рендерятся на сервере, идет обращение к Supabase для получения данных из базы

## Юзкейсы

1. Юзер регается

2. Выбирает банк, создает кошелек (например российский банк и кошелек с цифровым рублем)

3. Пополняет кошелек своей имеющейся картой (mockup добавление денег) - карта здесь внешняя

4. Выбирает зарубежный банк и создает там карту. Пополняет эту карту со своего кошелька. Происходит конвертация

5. ???

6. Profit (юзер имеет баланс на карте, платит ей в сервисах где хочет)

### Подлкючение банка

Банк добавляет админ в админке: /admin

Для банков можно брендировать карту (указать логотип и сделать свой градиент у карты)

### Курсы валют

Курсы валют захардкожены в /scripts/scripts.js. Мы их питоном вытянули с сайта ЦБ.


# Supabase Starter

This starter configures Supabase Auth to use cookies, making the user's session available throughout the entire Next.js app - Client Components, Server Components, Route Handlers, Server Actions and Middleware.

## Deploy your own

The Vercel deployment will guide you through creating a Supabase account and project. After installation of the Supabase integration, all relevant environment variables will be set up so that the project is usable immediately after deployment 🚀

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/vercel/next.js/tree/canary/examples/with-supabase&project-name=nextjs-with-supabase&repository-name=nextjs-with-supabase&integration-ids=oac_jUduyjQgOyzev1fjrW83NYOv)

## How to use

1. Create a [new Supabase project](https://database.new)
1. Run `npx create-next-app -e with-supabase` to create a Next.js app using the Supabase Starter template
1. Use `cd` to change into the app's directory
1. Run `npm install` to install dependencies
1. Rename `.env.local.example` to `.env.local` and update the values for `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` from [your Supabase project's API settings](https://app.supabase.com/project/_/settings/api)
1. Run `npm run dev` to start the local development server

> Check out [the docs for Local Development](https://supabase.com/docs/guides/getting-started/local-development) to also run Supabase locally.

### Create a Supabase client

Check out the [`/app/_examples`](./app/_examples/) folder for an example of creating a Supabase client in:

- [Client Components](./app/_examples/client-component/page.tsx)
- [Server Components](./app/_examples/server-component/page.tsx)
- [Route Handlers](./app/_examples/route-handler/route.ts)
- [Server Actions](./app/_examples/server-action/page.tsx)

### Create `todo` table and seed with data (optional)

Navigate to [your project's SQL Editor](https://app.supabase.com/project/_/sql), click `New query`, paste the contents of the [init.sql](./supabase/migrations/20230618024722_init.sql) file and click `RUN`.

This will create a basic `todos` table, enable Row Level Security (RLS), and write RLS policies enabling `select` and `insert` actions for `authenticated` users.

To seed your `todos` table with some dummy data, run the contents of the [seed.sql](./supabase/seed.sql) file.

## Feedback and issues

Please file feedback and issues over on the [Supabase GitHub org](https://github.com/supabase/supabase/issues/new/choose).

## More Supabase examples

- [Next.js Subscription Payments Starter](https://github.com/vercel/nextjs-subscription-payments)
- [Cookie-based Auth and the Next.js 13 App Router (free course)](https://youtube.com/playlist?list=PL5S4mPUpp4OtMhpnp93EFSo42iQ40XjbF)
- [Supabase Auth and the Next.js App Router](https://github.com/supabase/supabase/tree/master/examples/auth/nextjs)
- [Next.js Auth Helpers Docs](https://supabase.com/docs/guides/auth/auth-helpers/nextjs)
