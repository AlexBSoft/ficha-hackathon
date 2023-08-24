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
  .select<string, any>().or(`card_from.eq.${card.id},card_to.eq.${card.id}`)

  return (
    <div className="w-full flex flex-col items-center">
        <Navbar />

      <div className="animate-in flex flex-col gap-14 max-w-4xl px-3 py-16 lg:py-24 text-foreground">
        <div className="flex flex-col items-center mb-4 lg:mb-12">
          <p className="text-3xl lg:text-4xl !leading-tight mx-auto max-w-xl text-center my-12">
            Карта
          </p>
          
          <Box
            style={{
              borderRadius: 'var(--radius-4)',
              color: "white"
            }}
            className='hover:shadow-xl'
          >
              <Flex
                direction="column"
                justify="between"
                style={
                  {
                    height: 168,
                    width: 300,
                    position: 'relative',
                    background: 'linear-gradient(to top right, hsl(226, 70.0%, 55.5%), #E18BFF)',
                    boxShadow: '0 1px 20px -5px #7971E9AA',
                    borderRadius: '6px',
                    '--gray-12': 'white',
                  } as React.CSSProperties
                }
                
              >
                <Text weight="medium" mt="3" mx="3" size="2">
                  {card.cardholder}
                </Text>
                <img src={bank.logo} style={{position:'absolute', top: "12px", right: 0, height: "32px"}}/>
                <Box>
                  <Flex align="center" gap="3" mb="1" mx="3">
                    <Text size="2">
                    {card_number_to_chuks(card?.number)}
                    </Text>
                    <IconButton tabIndex={-1} variant="ghost" color="gray" size="1" highContrast>
                      <CopyIcon />
                    </IconButton>
                  </Flex>
                  <Flex gap="3" mb="2" mx="3">
                    <Text size="2">{card.expire_date}</Text>
                    <Text size="2">{card.cvv}</Text>
                  </Flex>
                </Box>
              </Flex>
          </Box>
        
        <p className='mt-4'>Баланс:</p>
        
          <p className="text-2xl lg:text-3xl !leading-tight mx-auto max-w-xl text-center my-12">{card?.balance} 
          <span className="text-sm"> {card?.currency}</span></p>

            <Link href="/cards/create"className="">
                <Button variant="outline"> Перевести</Button>
            </Link>

            <Link href="/cards/create"className="">
                <Button variant="outline"> Пополнить</Button>
            </Link>
        </div>

        <div className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent" />

        <div className="flex flex-col gap-8 text-foreground">
          <h2 className="text-lg font-bold text-center">
            Транзакции
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {transactions?.map(({id,number,cardholder,cvv, bank, currency, balance}) => (
                <a
                    key={id}
                    className="relative flex flex-col group rounded-lg border p-6 hover:border-foreground"
                    href={`/cards/${id}`}
                    target="_blank"
                    rel="noreferrer"
                >
                    <h3 className="font-bold mb-2  min-h-[40px] lg:min-h-[60px]">
                    {number}
                    </h3>
                    <div className="flex flex-col grow gap-4 justify-between">
                    <p className="text-sm opacity-70">{cardholder}</p>
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
