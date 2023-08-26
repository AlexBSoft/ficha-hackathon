import Link from 'next/link'
import Messages from './messages'
import Navbar from '@/components/Navbar'

export default function Login() {
  return (
    <div className="w-full flex flex-col items-center">
        <Navbar />

      <div className="animate-in flex flex-col gap-14 max-w-4xl px-3 py-16 lg:py-24 text-foreground">
        <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
          

          <form
            className="flex-1 flex flex-col w-full justify-center gap-2 text-foreground"
            action="/auth/sign-in"
            method="post"
          >
            <label className="text-md" htmlFor="email">
              Email
            </label>
            <input
              className="rounded-md px-4 py-2 bg-inherit border mb-6"
              name="email"
              placeholder="you@example.com"
              required
            />
            <label className="text-md" htmlFor="password">
              Пароль
            </label>
            <input
              className="rounded-md px-4 py-2 bg-inherit border mb-6"
              type="password"
              minLength={6}
              name="password"
              placeholder="••••••••"
              required
            />
            <button className="bg-green-700 rounded px-4 py-2 text-white mb-2">
              Войти
            </button>
            <button
              formAction="/auth/sign-up"
              className="border border-gray-700 rounded px-4 py-2 text-black mb-2"
            >
              Создать аккаунт
            </button>
            <Messages />
          </form>
        </div>
      </div>
    </div>
  
  )
}
