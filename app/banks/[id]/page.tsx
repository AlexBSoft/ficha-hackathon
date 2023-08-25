import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import Link from 'next/link'

import Navbar from '@/components/Navbar'

export const dynamic = 'force-dynamic'

import { Button } from "@/components/ui/button"

import {hash} from "@/scripts/scripts"
import { BankCard } from '@/components/BankCard'
import { Footer } from '@/components/Footer'
import { WalletCreateModal } from '@/components/WalletCreateModal'

function truncateString(str: String, firstCharCount = str.length, endCharCount = 0, dotCount = 3) {
  if (str.length <= firstCharCount + endCharCount) {
    return str; // No truncation needed
  }
  const firstPortion = str.slice(0, firstCharCount);
  const endPortion = str.slice(-endCharCount);
  const dots = '.'.repeat(dotCount);
  return `${firstPortion}${dots}${endPortion}`;
}


export default async function Bank({ params }: { params: { id: string } }) {
  const supabase = createServerComponentClient({ cookies })

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Получение  из БД
  let { data: bank, error: berror } = await supabase
  .from('banks')
  .select<string, any>().eq('id', params.id)
  .limit(1).single()

  console.log("dd", bank)

  let { data: wallets, error: werror} = await supabase
  .from('crypto_wallets')
  .select<string, any>().eq('user_id', user?.id).eq('bank_id', bank?.id)

  const { data: cards, error: cerror } = await supabase
  .from('cards')
  .select<string, any>().eq('user_id', user?.id).eq('bank_id', bank?.id)

  return (
    <div className="w-full  flex flex-col items-center">
        <Navbar />

      <div className="animate-in flex flex-col gap-14 max-w-4xl px-3 py-16 lg:py-24 text-foreground">
        <div className="flex flex-col items-center mb-4 lg:mb-12">
          <p className="text-3xl lg:text-4xl !leading-tight mx-auto max-w-xl text-center my-12">
            <img src={bank?.logo} style={{maxWidth:'256px'}} />
            {bank?.name}
          </p>

            <WalletCreateModal bank={bank} />

            <Link
                href={`/cards/create?bank_id=${bank?.id}`}
                className=""
              >
                <Button variant="outline"> Выпустить карту этого банка</Button>
            </Link>
          
        </div>

        <div className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent" />

        <div className="flex flex-col gap-8 text-foreground">
          <h2 className="text-lg font-bold text-center">
            Кошельки этого банка
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {wallets?.map(({id,address,blockchain,cvv, bank, currency, balance}) => (
                <a
                    key={id}
                    className="relative flex flex-col group rounded-lg border p-6 hover:border-foreground"
                    href={`/wallets/${id}`}
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

        <div className="flex flex-col gap-8 text-foreground">
          <h2 className="text-lg font-bold text-center">
            Карты этого банка
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {cards?.map(({id,number,cardholder,cvv, bank, currency, balance, bank_logo}) => (
              <div id={id}>
                <Link href={`/cards/${id}`}>
                  <BankCard id={id} number={number} cardholder={cardholder} balance={balance} currency={currency} bank_logo={bank?.logo} name={null} expire_date={null} cvv={null} card_style={bank?.card_style}/>
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
