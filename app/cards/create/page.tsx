import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import Link from 'next/link'

import Navbar from '@/components/Navbar'
import { NewCardForm } from '@/components/NewCardForm'

export const dynamic = 'force-dynamic'

const myCards = [
    {
        bank: "b",
        number: "4242424242424",
        balance: "4242",
        currency: "p",
        id: "123456"
    }
]


export default async function CreateCard({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const supabase = createServerComponentClient({ cookies })

  


  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Получение из БД
  let { data: bank, error: berror } = await supabase
  .from('banks')
  .select<string, any>().eq('id', searchParams?.bank_id)
  .limit(1).single()

  return (
    <div className="w-full flex flex-col items-center">
        <Navbar />

      <div className="animate-in flex flex-col gap-14 max-w-4xl px-3 py-16 lg:py-24 text-foreground">
        <div className="flex flex-col items-center mb-4 lg:mb-12">

          <p className="text-3xl lg:text-4xl !leading-tight mx-auto max-w-xl text-center my-12">
            Выпуск карты
          </p>

          {bank?.logo && <img src={bank?.logo} style={{height: "48px"}} />}
        </div>

        <NewCardForm bank_id={bank.id} currency={bank.currency} />

        <div className="flex justify-center text-center text-xs">
          <p>
            Made in Taganrog
          </p>
        </div>
      </div>
    </div>
  )
}
