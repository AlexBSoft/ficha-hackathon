"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

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
import { card_number_to_chuks } from "@/scripts/scripts";

import { useForm, SubmitHandler } from "react-hook-form";
import { Send } from "lucide-react";

export function WalletTransferModal({ wallet }: {  wallet: any} ) {

    const router = useRouter();

    const supabase = createClientComponentClient()

    const { register, handleSubmit, watch, formState: { errors } } = useForm<any>();

    const onSubmit: SubmitHandler<any> = async (data) => {
        console.log("submit",data)

        const { data: target_wallet } = await supabase
        .from('crypto_wallets')
        .select<string, any>().eq('address', data.address)
        .limit(1).single()


        if(!target_wallet)
            return toast.error("Кошелек получателя не найден")

        if(target_wallet.currency != wallet.currency)
            return toast.error("Валюта кошелька не совпадает")

        // Затем мы добавляем запись в базу данных (nзапись это все данные )
        const { data: ddata, error: derror } = await supabase
        .from('crypto_transactions')
        .insert({ hash: "xxxx", wallet_from: wallet.address, wallet_to: data.address, amount: data.amount})
        .select()

        const { error } = await supabase
        .from('crypto_wallets')
        .update({ balance: Number(wallet.balance) - Number(data.amount) })
        .eq('id', wallet.id)

        
        await supabase
        .from('crypto_wallets')
        .update({ balance: Number(target_wallet.balance) + Number(data.amount) })
        .eq('address', data.address)

        if(derror || error){
            console.log("error",derror,error)
            return toast.error('Ошибка создания перевода')
        }

        console.log(ddata)

        router.refresh()
    } 

    return (
        <Dialog>
        <DialogTrigger asChild>
            <Button variant="outline"><Send className="mr-2 h-4 w-4" /> Перевести {wallet.currency}</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
            <DialogTitle>Перевод</DialogTitle>
            <DialogDescription>
                Проверьте адрес перед отправкой
            </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                Кошелек
                </Label>
                <Input placeholder="0x0000" className="col-span-3" {...register("address", { required: true })} />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                Сумма
                </Label>
                <Input placeholder="123" className="col-span-3" {...register("amount", { required: true })} />
            </div>
            </div>
            <DialogFooter>
            <Button type="submit">Отправить</Button>
            </DialogFooter>
            </form>
        </DialogContent>
        </Dialog>
    )
}
