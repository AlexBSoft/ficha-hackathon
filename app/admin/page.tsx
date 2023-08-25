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


export default async function Admin() {
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
                        Админка
                    </p>

                    <Link
                        href="/admin/createbank"
                        className=""
                    >
                        <Button variant="outline"> Подключить новый банк</Button>
                    </Link>
                </div>

                <div className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent" />

                <div className="flex flex-col gap-8 text-foreground">
                    <h2 className="text-lg font-bold text-center">
                        Банки в системе
                    </h2>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">Название</TableHead>
                                <TableHead>Страна</TableHead>
                                <TableHead>Валюта</TableHead>
                                <TableHead>Лого</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {banks?.map(({ id, name, currency, contry, logo, }) => (
                                <TableRow>
                                    <TableCell className="font-medium"><a
                                        key={id}
                                        href={`/cards/${id}`}
                                    >{name}</a></TableCell>
                                    <TableCell>{contry}</TableCell>
                                    <TableCell>{currency}</TableCell>
                                    <TableCell className="text-right">{logo}</TableCell>
                                </TableRow>
                            ))}

                        </TableBody>
                    </Table>

                </div>

                <div className="flex flex-col gap-8 text-foreground">
                    <h2 className="text-lg font-bold text-center">
                        Пользователи в системе
                    </h2>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">Название</TableHead>
                                <TableHead>Страна</TableHead>
                                <TableHead>Лого</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {banks?.map(({ id, name, contry, logo, }) => (
                                <TableRow>
                                    <TableCell className="font-medium"><a
                                        key={id}
                                        href={`/cards/${id}`}
                                    >{name}</a></TableCell>
                                    <TableCell>{contry}</TableCell>
                                    <TableCell className="text-right">{logo}</TableCell>
                                </TableRow>
                            ))}

                        </TableBody>
                    </Table>

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
