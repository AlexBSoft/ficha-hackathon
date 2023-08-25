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
import { useState } from "react";

export function CardTransferModal({ card }: {  card: any} ) {
    const [open, setOpen] = useState(false);
    const router = useRouter();

    const supabase = createClientComponentClient()

    const { register, handleSubmit, watch, formState: { errors } } = useForm<any>();

    const onSubmit: SubmitHandler<any> = async (data) => {
        console.log("submit",data)

        let cardTo = data.card.replaceAll(' ', '')
        // Затем мы добавляем запись в базу данных (nзапись это все данные о нашем NFT)
        const { data: ddata, error: derror } = await supabase
        .from('transactions')
        .insert({ card_from: card.number, card_to: cardTo, value: data.amount})
        .select()

        const { data: target_card } = await supabase
        .from('cards')
        .select<string, any>().eq('number', cardTo)
        .limit(1).single()

        if(!target_card)
            return toast.error("Карта получателя не найдена")

        if(target_card.currency != card.currency)
            return toast.error("Валюта карты не совпадает")

        const { error } = await supabase
        .from('cards')
        .update({ balance: Number(card.balance) - Number(data.amount) })
        .eq('id', card.id)

        

        await supabase
        .from('cards')
        .update({ balance: Number(target_card.balance) + Number(data.amount) })
        .eq('number', cardTo)

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
            <Button variant="outline">Перевести {card.currency}</Button>
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
                Номер карты
                </Label>
                <Input placeholder="4242 4242 4242 4242" className="col-span-3" {...register("card", { required: true })} />
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
