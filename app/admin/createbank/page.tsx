import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import Link from 'next/link'

import Navbar from '@/components/Navbar'

export const dynamic = 'force-dynamic'

import { Button } from "@/components/ui/button"

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { NewAdminBankForm } from '@/components/NewAdminBankForm'


export default async function AdminCreateBank() {
    const supabase = createServerComponentClient({ cookies })

    const {
        data: { user },
    } = await supabase.auth.getUser()

    // Получение  из БД
    const { data: card, error: cerror } = await supabase
        .from('cards')
        .select<string, any>()
    const { data: banks, error: berror } = await supabase
        .from('banks')
        .select<string, any>()
    const { data: crypto_wallets, error: cwerror } = await supabase
        .from('crypto_wallets')
        .select<string, any>()

    return (
        <div className="w-full flex flex-col items-center">
            <Navbar />

            <div className="animate-in flex flex-col gap-14 max-w-4xl px-3 py-16 lg:py-24 text-foreground">
        <div className="flex flex-col items-center mb-4 lg:mb-12">

          <p className="text-3xl lg:text-4xl !leading-tight mx-auto max-w-xl text-center my-12">
            Подключение банка
          </p>
        </div>

        <NewAdminBankForm  />

        <div className="flex justify-center text-center text-xs">
          <p>
            Made in Taganrog
          </p>
        </div>
      </div>
        </div>
    )
}
