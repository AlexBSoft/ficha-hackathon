"use client"

import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"

// Supabase - в него мы грузим данные
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { card_number_to_chuks, hash } from "@/scripts/scripts";
import { Checkbox } from "@/components/ui/checkbox"

import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";

export function WalletCreateModal({ bank }: {  bank: any} ) {
    const [open, setOpen] = useState(false);

    const supabase = createClientComponentClient()
    const router = useRouter();

    const { register, handleSubmit, watch, formState: { errors } } = useForm<any>();

    const onSubmit: SubmitHandler<any> = async (data) => {
        console.log("submit",data)

        await supabase
        .from('crypto_wallets')
        .insert({ address: hash(), balance: 0, currency: `c${bank.currency}`, blockchain: `c${bank.currency}`, bank_id: bank.id})

        // Затем мы добавляем запись в базу данных (nзапись это все данные о нашем NFT)
        // const { data: ddata, error: derror } = await supabase
        // .from('crypto_transactions')
        // .insert({ hash: "xxxx", wallet_from: "EXCHANGEDOG", wallet_to:  wallet.address, amount: data.amount})
        // .select()

        // const { error } = await supabase
        // .from('crypto_wallets')
        // .update({ balance: Number(wallet.balance) + Number(data.amount) })
        // .eq('id', wallet.id)
        // if(derror || error){
        //     console.log("error",derror,error)
        //     return toast.error('Ошибка создания перевода')
        // }

        //console.log(ddata)
        toast.success("Кошелек создан")

        // После - открываем страницу созданного NFT
        //router.push(`/nft/${ddata[0].id}`)
        setOpen(false)
        router.refresh()
    } 

    return (
        <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
            <Button variant="outline">Создать цифровой кошелек</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
            <DialogTitle>Создание цифрового кошелька</DialogTitle>
            <DialogDescription>
                Цифровой кошелек банка {bank.name} 
            </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-4 py-4">
            
            <div className="items-top flex space-x-2">
                <Checkbox id="terms1" />
                <div className="grid gap-1.5 leading-none">
                    <label
                    htmlFor="terms1"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                    Я принимаю правила использования цифровых кошельков
                    </label>
                    <p className="text-sm text-muted-foreground">
                    Использование цифровых валют регулируется соответствующими законами
                    </p>
                </div>
                </div>
            
            </div>
            <DialogFooter>
            <Button type="submit">Создать</Button>
            </DialogFooter>
            </form>
            <Toaster />
        </DialogContent>
        </Dialog>
    )
}