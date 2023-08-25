import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import Link from 'next/link'
import LogoutButton from '../components/LogoutButton'
import SupabaseLogo from '../components/SupabaseLogo'
import NextJsLogo from '../components/NextJsLogo'
import Navbar from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { BankCard } from '@/components/BankCard'
import { ScrollArea } from '@radix-ui/themes'

export const dynamic = 'force-dynamic'

export default async function Index() {
  const supabase = createServerComponentClient({ cookies })

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { data: banks, error: berror } = await supabase
    .from('banks')
    .select<string, any>()

  let { data: wallets, error: werror } = await supabase
    .from('crypto_wallets')
    .select<string, any>().eq('user_id', user?.id)

  const { data: cards, error: cerror } = await supabase
    .from('cards')
    .select<string, any>().eq('user_id', user?.id)

  return (
    <div className="w-full container mx-auto flex flex-col items-center">
      <Navbar />

      <div className="animate-in flex flex-col gap-14 max-w-4xl px-3 py-16 lg:py-24 text-foreground">
        {!user && <>
          Войдите в аккаунт
        </>
        }
        {user && <>

          <h3>Банки системы</h3>

          <div className="flex overflow-x-auto w-full" style={{maxWidth:'93vw'}}>
          <ScrollArea size="1"  scrollbars="horizontal">
            <div className="flex flex-nowrap">
              {banks?.map(({ id, logo, name, country, currency, balance }) => (
                <Link
                  key={id}
                  className="relative flex flex-col group rounded-lg border p-6 hover:border-foreground mr-6"
                  href={`/banks/${id}`}
                >
                  <h3 className="font-bold mb-2  min-h-[40px] lg:min-h-[60px] max-w-[256px]">
                    <img src={logo} />
                    {name}
                  </h3>
                  <div className="flex flex-col grow gap-4 justify-between">
                    <p className="text-sm opacity-70">{country}</p>
                    <div className="flex justify-between items-center">
                      {balance} {currency}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            </ScrollArea>
          </div>

          <h3>Мои кошельки</h3>

          <div className="flex overflow-x-auto w-full" style={{maxWidth:'93vw'}}>
          <ScrollArea size="1" scrollbars="horizontal" >
            <div className="flex flex-nowrap">
              {banks?.map(({ id, logo, name, country, currency, balance }) => (
                <Link
                  key={id}
                  className="relative flex flex-col group rounded-lg border p-6 hover:border-foreground mr-6"
                  href={`/banks/${id}`}
                >
                  <h3 className="font-bold mb-2  min-h-[40px] lg:min-h-[60px] max-w-[256px]">
                    <img src={logo} />
                    {name}
                  </h3>
                  <div className="flex flex-col grow gap-4 justify-between">
                    <p className="text-sm opacity-70">{country}</p>
                    <div className="flex justify-between items-center">
                      {balance} {currency}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            </ScrollArea>
          </div>

          

          <h3>Мои карты</h3>

          <div className="flex overflow-x-auto w-full" style={{maxWidth:'93vw'}}>
          <ScrollArea size="1" scrollbars="horizontal">
            <div className="flex flex-nowrap">
              {cards?.map(({id,number,cardholder,cvv, bank, currency, balance, bank_logo}) => (
                <div id={id} className='mr-6 mb-4'>
                  <Link href={`/cards/${id}`}>
                    <BankCard id={id} number={number} cardholder={cardholder} balance={balance} currency={currency} bank_logo={bank?.logo} name={null} expire_date={null} cvv={null}/>
                  </Link>
                </div>
              ))}
            </div></ScrollArea>
          </div>

        </>}

        <Footer />
      </div>
    </div>
  )
}
