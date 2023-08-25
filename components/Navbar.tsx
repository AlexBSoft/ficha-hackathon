import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import Link from 'next/link'
import LogoutButton from '@/components/LogoutButton'
import { Button } from '@radix-ui/themes'

export default async function Navbar() {
    const supabase = createServerComponentClient({ cookies })
    const {
        data: { user },
    } = await supabase.auth.getUser()
    return (
        <nav className="w-full flex justify-center border-b border-b-foreground/10" style={{ marginTop: "8px", paddingBottom: "8px" }}>

            <nav className="bg-white border-gray-200 dark:bg-gray-900">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <Link href="/" className="flex items-center" style={{ position: "absolute", left: "32px" }}>
                        <img src="https://i.imgur.com/HuAzLhV.png" className="h-8 mr-3" alt="Logo" />
                        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"></span>
                    </Link>
                    {user && 
                    <div className="flex items-center md:order-2" style={{ position: "absolute", right: "32px" }}>
                        <Link href="/profile" className="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom">
                            <span className="sr-only">Open user menu</span>
                            <img className="w-8 h-8 rounded-full" src="https://i.imgur.com/EqFWbte.jpeg" alt="user photo" />
                        </Link>
                    </div>
                    }
                    {!user && <Link
                            href="/login"
                            style={{ position: "absolute", right: "32px" }}>
                            <Button variant="outline">Войти</Button>
                        </Link>}
                </div>
            </nav>

            {/* <div className="w-full max-w-4xl flex justify-between items-center p-3  text-sm text-foreground navbar ">
                <div className='flex flex-1 items-center gap-4'>
                    <Link
                        href="/"
                        className="">
                        Главная
                    </Link>
                    
                    {user && <Link
                        href={`/cards/`}
                        className="">
                        Карты
                    </Link>}

                    {user && <Link
                        href={`/wallets/`}
                        className="">
                        Кошельки
                    </Link>}

                    {user && <Link
                        href={`/banks/`}
                        className="">
                        Банки
                    </Link>}
                </div>
                <div className='flex-none'>
                    {user ? (
                        <div className="flex items-center gap-4">
                            Привет, {user.email}!
                            <LogoutButton />
                        </div>
                    ) : (
                        <Link
                            href="/login"
                            className="py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover">
                            Вход
                        </Link>
                    )}
                </div>
            </div> */}
        </nav>
    )
}