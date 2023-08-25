import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import Link from 'next/link'

import Navbar from '@/components/Navbar'

export const dynamic = 'force-dynamic'

import { Button } from "@/components/ui/button"
import { BankCard } from '@/components/BankCard'
import { Footer } from '@/components/Footer'


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
                href="/banks"
                className=""
              >
                <Button variant="outline"> Выбрать банк и выпустить новую карту</Button>
            </Link>
        </div>

        <div className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent" />

        <div className="flex flex-col gap-8 text-foreground">
          <h2 className="text-lg font-bold text-center">
            Мои банковские карты
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {cards?.map(({id,number,cardholder,cvv, bank, currency, balance, bank_logo, style}) => (
              <div id={id}>
                <Link href={`/cards/${id}`}>
                  <BankCard id={id} number={number} cardholder={cardholder} balance={balance} currency={currency} bank_logo={bank_logo} card_style={style} />
                </Link>
               </div>
            ))}
          </div>
        </div>



        <Footer />
      </div>
    </div>
  )
}
