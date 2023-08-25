import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import Link from 'next/link'

import Navbar from '@/components/Navbar'

export const dynamic = 'force-dynamic'

import { Button } from "@/components/ui/button"
import { BankCard } from '@/components/BankCard'
import { Footer } from '@/components/Footer'
import { ProfileForm } from '@/components/ProfileForm'


export default async function Profile() {
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
            Профиль
          </p>
          <form action="/auth/sign-out" method="post">
            <Button variant="outline"> Выйти из аккаунта</Button>
          </form>
        </div>

        <div className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent" />

        <div className="flex flex-col gap-8 text-foreground">
          <h2 className="text-lg font-bold text-center">
            Мои данные
          </h2>
          
          <ProfileForm />



          <form action="/auth/sign-out" method="post">
            <Button variant="destructive" > Удалить аккаунт</Button>
          </form>
        </div>

        

        <Footer />
      </div>
    </div>
  )
}
