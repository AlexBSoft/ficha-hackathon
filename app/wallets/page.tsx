import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import Link from 'next/link'

import Navbar from '@/components/Navbar'

export const dynamic = 'force-dynamic'

import { Button } from "@/components/ui/button"

import {hash} from "@/scripts/scripts"

function truncateString(str: String, firstCharCount = str.length, endCharCount = 0, dotCount = 3) {
  if (str.length <= firstCharCount + endCharCount) {
    return str; // No truncation needed
  }
  const firstPortion = str.slice(0, firstCharCount);
  const endPortion = str.slice(-endCharCount);
  const dots = '.'.repeat(dotCount);
  return `${firstPortion}${dots}${endPortion}`;
}


export default async function Wallets() {
  const supabase = createServerComponentClient({ cookies })

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Получение  из БД
  let { data: wallets, error: cerror } = await supabase
  .from('crypto_wallets')
  .select<string, any>().eq('user_id', user?.id)

  if(wallets?.length == 0){
    
    await supabase
    .from('crypto_wallets')
    .insert({ address: hash(), balance: 0, currency: "caed", blockchain: "caed", bank_id: 3 })

    await supabase
    .from('crypto_wallets')
    .insert({ address: hash(), balance: 0, currency: "ccny", blockchain: "ccny", bank_id: 2 })

    await supabase
    .from('crypto_wallets')
    .insert({ address: hash(), balance: 0, currency: "crub", blockchain: "crub", bank_id: 1})
    
    const { data: _wallets, error: _cerror } = await supabase
    .from('crypto_wallets')
    .select<string, any>().eq('user_id', user?.id)

    wallets = _wallets
  }

  return (
    <div className="w-full flex flex-col items-center">
        <Navbar />

      <div className="animate-in flex flex-col gap-14 max-w-4xl px-3 py-16 lg:py-24 text-foreground">
        <div className="flex flex-col items-center mb-4 lg:mb-12">
          <p className="text-3xl lg:text-4xl !leading-tight mx-auto max-w-xl text-center my-12">
            Крипто-Кошельки
          </p>
          
        </div>

        <div className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent" />

        <div className="flex flex-col gap-8 text-foreground">
          <h2 className="text-lg font-bold text-center">
            Мои кошельки
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {wallets?.map(({id,address,blockchain,cvv, bank, currency, balance}) => (
              <a
                key={id}
                className="relative flex flex-col group rounded-lg border p-6 hover:border-foreground"
                href={`/wallets/${id}`}
                target="_blank"
                rel="noreferrer"
              >
                <h3 className="font-bold mb-2  min-h-[40px] lg:min-h-[60px]">
                  {truncateString(address, 10, 8)}
                </h3>
                <div className="flex flex-col grow gap-4 justify-between">
                  <p className="text-sm opacity-70">{blockchain}</p>
                  <div className="flex justify-between items-center">
                    {balance} {currency}
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
