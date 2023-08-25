import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import Link from 'next/link'
import LogoutButton from '../components/LogoutButton'
import SupabaseLogo from '../components/SupabaseLogo'
import NextJsLogo from '../components/NextJsLogo'
import Navbar from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { BankCard } from '@/components/BankCard'
import { Button, ScrollArea } from '@radix-ui/themes'

export const dynamic = 'force-dynamic'

function truncateString(str: String, firstCharCount = str.length, endCharCount = 0, dotCount = 3) {
  if (str.length <= firstCharCount + endCharCount) {
    return str; // No truncation needed
  }
  const firstPortion = str.slice(0, firstCharCount);
  const endPortion = str.slice(-endCharCount);
  const dots = '.'.repeat(dotCount);
  return `${firstPortion}${dots}${endPortion}`;
}


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
    <div className="w-full mx-auto flex flex-col items-center">
      <Navbar />

      <div className="animate-in flex flex-col gap-14 max-w-4xl px-3 py-16 lg:py-24 text-foreground">
        {!user && <>
          <section className="bg-white dark:bg-gray-900">
    <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
        <Link href="#" className="inline-flex justify-between items-center py-1 px-1 pr-4 mb-7 text-sm text-gray-700 bg-gray-100 rounded-full dark:bg-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700" role="alert">
            <span className="text-xs bg-purple-600 rounded-full text-white px-4 py-1.5 mr-3">New</span> 
            <span className="text-sm font-medium">
              Посмотрите видео о DogPay</span> 
            <svg className="ml-2 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
        </Link>
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
          Платежная платформа</h1>
        <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
          <b>DogPay</b> это супер крутая платформа цифровых валют, позволяющая оформлять карты в зарубежных банках</p>
        <div className="flex flex-col mb-8 lg:mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
            <Link href="/login" className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900">
                Создать аккаунт
                <svg className="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
            </Link>
            <Link href="#" className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-gray-900 rounded-lg border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
                <svg className="mr-2 -ml-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"></path></svg>
                Смотреть презентацию
            </Link>  
        </div>
        <div className="px-4 mx-auto text-center md:max-w-screen-md lg:max-w-screen-lg lg:px-36">
            <span className="font-semibold text-gray-400 uppercase">
              Плати с нами на</span>
            <div className="flex flex-wrap justify-center items-center mt-8 text-gray-500 sm:justify-between">
                <a href="#" className="mr-5 mb-5 hover:text-gray-800 dark:hover:text-gray-400 ">
                
                <img src="https://upload.wikimedia.org/wikipedia/commons/2/2b/PlayStation_Store.png" style={{height:"32px"}}/>           
                </a>
                <a href="#" className="mr-5 mb-5 hover:text-gray-800 dark:hover:text-gray-400">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" style={{height:"32px"}}/>                   
                </a>
                <a href="#" className="mr-5 mb-5 hover:text-gray-800 dark:hover:text-gray-400 ">
                <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Steam_2016_logo_black.svg" style={{height:"32px"}}/> 
                                                               
                </a>
                <a href="#" className="mr-5 mb-5 hover:text-gray-800 dark:hover:text-gray-400">  
                  <img src="https://upload.wikimedia.org/wikipedia/commons/2/26/Spotify_logo_with_text.svg" style={{height:"32px"}}/>                                          
                </a> 

                <a href="#" className="mr-5 mb-5 hover:text-gray-800 dark:hover:text-gray-400">  
                  <img src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" style={{height:"32px"}}/>                                          
                </a>  

                <a href="#" className="mr-5 mb-5 hover:text-gray-800 dark:hover:text-gray-400">  
                  <img src="https://upload.wikimedia.org/wikipedia/commons/f/f1/Blizzard_Entertainment_Logo_2014.svg" style={{height:"32px"}}/>                                          
                </a>        
            </div>
        </div> 
    </div>
</section>
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
              {wallets?.map(({id,address,blockchain,cvv, bank, currency, balance}) => (
                <Link key={id} className="relative flex flex-col group rounded-lg border p-6 hover:border-foreground mr-6 mb-4"
                  href={`/wallets/${id}`}>
                  <h3 className="font-bold mb-2  min-h-[40px] lg:min-h-[60px]">
                    {truncateString(address, 10, 8)}
                  </h3>
                  <div className="flex flex-col grow gap-4 justify-between">
                    <p className="text-sm opacity-70">{blockchain}</p>
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
              {cards?.map(({id,number,cardholder,cvv, bank, currency, balance, bank_logo, style}) => (
                <div id={id} className='mr-6 mb-4'>
                  <Link href={`/cards/${id}`}>
                    <BankCard id={id} number={number} cardholder={cardholder} balance={balance} currency={currency} bank_logo={bank_logo} card_style={style} name={null} expire_date={null} cvv={null}/>
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
