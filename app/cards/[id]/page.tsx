import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
//import Link from 'next/link'

import Navbar from '@/components/Navbar'

export const dynamic = 'force-dynamic'
import { Button } from "@/components/ui/button"
//import { Button } from "@/components/ui/button"

import {card_number_to_chuks} from "@/scripts/scripts"

import {
    ArrowDownIcon,
    ArrowUpIcon,
    CheckIcon,
    CopyIcon,
    Cross2Icon,
    DotsHorizontalIcon,
    DrawingPinFilledIcon,
    DrawingPinIcon,
    OpenInNewWindowIcon,
    PlusIcon,
    Share2Icon,
  } from '@radix-ui/react-icons';
import {
    Avatar,
    Badge,
    Box,
    Card,
    Checkbox,
    Flex,
    Grid,
    Heading,
    IconButton,
    Link,
    Separator,
    Strong,
    Switch,
    Text,
    TextField,
    Theme,
  } from '@radix-ui/themes';
import { CardTransferModal } from '@/components/CardTransferModal'
import { CardTopUpModal } from '@/components/CardTopUpModal'
import { Footer } from '@/components/Footer'
import { Toaster } from 'react-hot-toast'
import { BankCard } from '@/components/BankCard'

function truncateString(str: String, firstCharCount = str.length, endCharCount = 0, dotCount = 3) {
  if (str.length <= firstCharCount + endCharCount) {
    return str; // No truncation needed
  }
  const firstPortion = str.slice(0, firstCharCount);
  const endPortion = str.slice(-endCharCount);
  const dots = '.'.repeat(dotCount);
  return `${firstPortion}${dots}${endPortion}`;
}


export default async function CardPage({ params }: { params: { id: string } }) {
  const supabase = createServerComponentClient({ cookies })

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Получение  из БД
  let { data: card, error: cerror } = await supabase
  .from('cards')
  .select<string, any>().eq('id', params.id)
  .limit(1).single()

  let { data: bank, error: berror } = await supabase
  .from('banks')
  .select<string, any>().eq('id', card.bank_id)
  .limit(1).single()

  let { data: transactions, error: terror } = await supabase
  .from('transactions')
  .select<string, any>().or(`card_from.eq.${card.number},card_to.eq.${card.number}`)

  let { data: wallets, error: werror } = await supabase
  .from('crypto_wallets')
  .select<string, any>().eq('user_id', user?.id)

  return (
    <div className="w-full flex flex-col items-center">
        <Navbar />

      <div className="animate-in flex flex-col gap-14 max-w-4xl px-3 py-16 lg:py-24 text-foreground">
        <div className="flex flex-col items-center mb-4 lg:mb-12">
          <p className="text-3xl lg:text-4xl !leading-tight mx-auto max-w-xl text-center my-12">
            Карта
          </p>
          
          <BankCard id={card.id} number={card.number} cardholder={card.cardholder} expire_date={card.expire_date} cvv={card.cvv} bank_logo={bank.logo} card_style={card.style} />
          
        
        <p className='mt-4'>Баланс:</p>
        
          <p className="text-2xl lg:text-3xl !leading-tight mx-auto max-w-xl text-center my-12">{card?.balance} 
          <span className="text-sm"> {card?.currency}</span></p>

          <div className='mb-3'>
            <CardTransferModal card={card} />
            </div>

            <CardTopUpModal card={card} wallets={wallets} />
        </div>

        <div className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent" />

        <div className="flex flex-col gap-8 text-foreground">
          <h2 className="text-lg font-bold text-center">
            Транзакции
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {transactions?.map(({id,card_from,card_to,value, created_at}) => (
               <div className='mb-4' id={id}>
                <p>{value} {card.currency}</p>
                <p>from {card_from}</p>
                <p>to {card_to}</p>
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
