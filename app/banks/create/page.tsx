import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import Link from 'next/link'

import Navbar from '@/components/Navbar'
import { NewCardForm } from '@/components/NewCardForm'

export const dynamic = 'force-dynamic'

export default async function CreateCard() {
  const supabase = createServerComponentClient({ cookies })

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Получение из БД
  const { data: banks, error: berror } = await supabase
  .from('banks')
  .select<string, any>()

  return (
    <div className="w-full flex flex-col items-center">
        <Navbar />

      <div className="animate-in flex flex-col gap-14 max-w-4xl px-3 py-16 lg:py-24 text-foreground">
        <div className="flex flex-col items-center mb-4 lg:mb-12">
          
          <p className="text-3xl lg:text-4xl !leading-tight mx-auto max-w-xl text-center my-12">
            Выпуск карты
          </p>
        </div>

        <NewCardForm />

    



        <div className="flex justify-center text-center text-xs">
          <p>
            Made in Taganrog
          </p>
        </div>
      </div>
    </div>
  )
}
