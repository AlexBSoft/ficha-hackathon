import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import Link from 'next/link'

import Navbar from '@/components/Navbar'

export const dynamic = 'force-dynamic'

import { Button } from "@/components/ui/button"

import {hash} from "@/scripts/scripts"
import { WalletTransferModal } from '@/components/WalletTransferModal'
import { WalletTopUpModal } from '@/components/WalletTopUpModal'
import { Footer } from '@/components/Footer'


function truncateString(str: String, firstCharCount = str.length, endCharCount = 0, dotCount = 3) {
  if (str.length <= firstCharCount + endCharCount) {
    return str; // No truncation needed
  }
  const firstPortion = str.slice(0, firstCharCount);
  const endPortion = str.slice(-endCharCount);
  const dots = '.'.repeat(dotCount);
  return `${firstPortion}${dots}${endPortion}`;
}


export default async function Wallet({ params }: { params: { id: string } }) {
  const supabase = createServerComponentClient({ cookies })

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Получение  из БД
  let { data: wallet, error: cerror } = await supabase
  .from('crypto_wallets')
  .select<string, any>().eq('id', params.id)
  .limit(1).single()

  let { data: transactions, error: terror } = await supabase
  .from('crypto_transactions')
  .select<string, any>().or(`wallet_from.eq.${wallet.address},wallet_to.eq.${wallet.address}`)

  return (
    <div className="w-full flex flex-col items-center">
        <Navbar />

      <div className="animate-in flex flex-col gap-14 max-w-4xl px-3 py-16 lg:py-24 text-foreground">
        <div className="flex flex-col items-center mb-4 lg:mb-12">
          <p className="text-3xl lg:text-4xl !leading-tight mx-auto max-w-xl text-center my-12">
            Кошелек
          </p>
          {wallet?.address}

          <p>{wallet?.balance} {wallet?.currency}</p>

            <WalletTransferModal wallet={wallet} />

            <WalletTopUpModal wallet={wallet} />
        </div>

        <div className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent" />

        <div className="flex flex-col gap-8 text-foreground">
          <h2 className="text-lg font-bold text-center">
            Транзакции
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-1 gap-4">
            {transactions?.map(({id,wallet_from,wallet_to,amount, created_at}) => (
               <div className='mb-4' id={id}>
                <p>{amount} {wallet.currency}</p>
                <p>from {wallet_from}</p>
                <p>to {wallet_to}</p>
                <p>{created_at}</p>
                </div>
                ))}
          </div>
        </div>



        <Footer />
      </div>
    </div>
  )
}
