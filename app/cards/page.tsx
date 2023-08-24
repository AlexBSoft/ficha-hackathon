import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import Link from 'next/link'

import Navbar from '@/components/Navbar'

export const dynamic = 'force-dynamic'

import { Button } from "@/components/ui/button"

const myCards = [
    {
        bank: "b",
        number: "4242424242424",
        balance: "4242",
        currency: "p",
        id: "123456"
    }
]

export default async function Cards() {
  const supabase = createServerComponentClient({ cookies })

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Получение  из БД
  const { data: cards, error: cerror } = await supabase
  .from('cards')
  .select<string, any>().eq('user_id', user?.id)

  return (
    <div className="w-full flex flex-col items-center">
        <Navbar />

      <div className="animate-in flex flex-col gap-14 max-w-4xl px-3 py-16 lg:py-24 text-foreground">
        <div className="flex flex-col items-center mb-4 lg:mb-12">
          <p className="text-3xl lg:text-4xl !leading-tight mx-auto max-w-xl text-center my-12">
            Банковские карты
          </p>
          
            <Link
                href="/cards/create"
                className=""
              >
                <Button variant="outline"> Выпустить новую карту</Button>
            </Link>
        </div>

        <div className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent" />

        <div className="flex flex-col gap-8 text-foreground">
          <h2 className="text-lg font-bold text-center">
            Мои банковские карты
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {myCards.map(({id}) => (
              <a
                key={id}
                className="relative flex flex-col group rounded-lg border p-6 hover:border-foreground"
                href={`/cards/${id}`}
                target="_blank"
                rel="noreferrer"
              >
                <h3 className="font-bold mb-2  min-h-[40px] lg:min-h-[60px]">
                  4345
                </h3>
                <div className="flex flex-col grow gap-4 justify-between">
                  <p className="text-sm opacity-70">3455</p>
                  <div className="flex justify-between items-center">
                    terttr
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>



        <div className="flex justify-center text-center text-xs">
          <p>
            Made in Taganrog
          </p>
        </div>
      </div>
    </div>
  )
}
