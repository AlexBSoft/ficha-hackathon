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
import { card_number_to_chuks } from "@/scripts/scripts";

import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { Checkbox } from './ui/checkbox';

export function WalletTopUpModal({ wallet }: {  wallet: any} ) {
    const [open, setOpen] = useState(false);

    const supabase = createClientComponentClient()
    const router = useRouter();

    const { register, handleSubmit, watch, formState: { errors } } = useForm<any>();

    const onSubmit: SubmitHandler<any> = async (data) => {
        console.log("submit",data)
        // Затем мы добавляем запись в базу данных (nзапись это все данные о нашем NFT)
        const { data: ddata, error: derror } = await supabase
        .from('crypto_transactions')
        .insert({ hash: "xxxx", wallet_from: "EXCHANGEDOG", wallet_to:  wallet.address, amount: data.amount})
        .select()

        const { error } = await supabase
        .from('crypto_wallets')
        .update({ balance: Number(wallet.balance) + Number(data.amount) })
        .eq('id', wallet.id)
        if(derror || error){
            console.log("error",derror,error)
            return toast.error('Ошибка создания перевода')
        }

        console.log(ddata)

        setOpen(false)
        router.refresh()
    } 

    return (
        <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
            <Button variant="outline">Пополнить кошелек с банковской карты</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
            <DialogTitle>Пополнение</DialogTitle>
            <DialogDescription>
                Купите {wallet.currency} с помощью банковской карты российского банка
            </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                Сумма
                </Label>
                <Input placeholder="123" className="col-span-3" {...register("amount", { required: true })} />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                Номер карты
                </Label>
                <Input placeholder="4242 4242 4242 4242" className="col-span-3" {...register("card_number", { required: true })} />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                Владелец карты
                </Label>
                <Input placeholder="Cardholder Name" className="col-span-3" {...register("cardholder", { required: true })} />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                Срок действия
                </Label>
                <Input placeholder="12/30" className="col-span-3" {...register("date", { required: true })} />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                CVV
                </Label>
                <Input placeholder="CVV" className="col-span-3" {...register("cvv", { required: true })} />
            </div>

            <div className="items-top flex space-x-2">
                <Checkbox id="terms1" />
                <div className="grid gap-1.5 leading-none">
                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Я принимаю правила использования цифровых кошельков
                    </label>
                    <p className="text-sm text-muted-foreground">
                        Использование цифровых валют регулируется соответствующими законами
                    </p>
                </div>
            </div>
            
            </div>
            <DialogFooter>
            <Button type="submit">Пополнить</Button>
            </DialogFooter>
            </form>
        </DialogContent>
        </Dialog>
    )
}
