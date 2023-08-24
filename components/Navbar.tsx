import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import Link from 'next/link'
import LogoutButton from '@/components/LogoutButton'

export default async function Navbar() {
    const supabase = createServerComponentClient({ cookies })
    const {
        data: { user },
    } = await supabase.auth.getUser()
    return (
        <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16" style={{marginTop: "8px"}}>
            <div className="w-full max-w-4xl flex justify-between items-center p-3  text-sm text-foreground navbar ">
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
            </div>
        </nav>
    )
}