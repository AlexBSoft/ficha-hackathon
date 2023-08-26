"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"

  import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"

// Supabase - в него мы грузим данные
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { card_number_to_chuks } from "@/scripts/scripts";

import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { Wallet } from "lucide-react";

const FormSchema = z.object({
    wallet: z.string(),
    amount: z.string().refine((val:any) => !Number.isNaN(parseInt(val, 10)), {
        message: "Expected number, received a string"
      })
  })


function convertCurrencies(amount: number, cur1: string, cur2: string){
    if(cur1 == 'c'+cur2 || cur2 == 'c'+cur1)
        return amount * 0.9

    if(cur1 == "crub"){
        if(cur2=="aed")
            return amount * 0.039
        if(cur2=="usd")
            return amount * 0.011
        if(cur2=="inr")
            return amount * 0.87
        if(cur2=="cny")
            return amount * 0.077
        if(cur2=="cny")
            return amount * 0.077
        if(cur2=="try")
            return amount * 0.28
         
    }

    return amount * 0.5

}

export function CardTopUpModal({ card, wallets }: {  card: any, wallets: any} ) {
    const [open, setOpen] = useState(false);
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
      })

    const router = useRouter();

    const supabase = createClientComponentClient()

    const { register, handleSubmit, getValues, watch, setValue, formState: { errors } } = useForm<any>();

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        console.log("submit",data)


        // Затем мы добавляем запись в базу данных

        await supabase
        .from('crypto_transactions')
        .insert({ hash: "xxxx", wallet_from: data.wallet, wallet_to: "EXCHANGEDOG", amount: data.amount})

        const { data: ddata, error: derror } = await supabase
        .from('transactions')
        .insert({ card_from: "EXCHANGEDOG", card_to: card.number, value: data.amount})
        .select()

        const { error } = await supabase
        .from('crypto_wallets')
        .update({ balance: Number(wallets.find( (e: any) => e.address == data.wallet )?.balance) - Number(data.amount) })
        .eq('address', data.wallet)


        await supabase
        .from('cards')
        .update({ balance: Number(card.balance) + Number(data.amount) })
        .eq('number', card.number)

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
            <Button variant="outline"><Wallet className="mr-2 h-4 w-4" /> Пополнить карту используя кошелек</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
            <DialogTitle>Пополнение</DialogTitle>
            <DialogDescription>
                Проверьте адрес перед отправкой
            </DialogDescription>
            </DialogHeader>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                control={form.control}
                name="wallet"
                render={({ field }) => (
                <FormItem>
                    <Select onValueChange={field.onChange} defaultValue={field.value}   >
                    <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Кошелек" />
                    </SelectTrigger>
                    <SelectContent >
                        {wallets?.map(({ address, balance, currency}: any) => (
                            <SelectItem key={address} value={address}>{balance} {currency}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                </FormItem>
                )}
                />

                <FormField
                    control={form.control}
                    name="amount"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Сумма</FormLabel>
                            <FormControl>
                                <Input placeholder="Сумма" type="number" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                
            <div className="grid gap-4 py-4">

            <p>Вы получите {convertCurrencies( Number(form.watch('amount')),wallets.find((e: any) => e.address === form.watch('wallet'))?.currency,  card.currency )} {card.currency} за {} {form.watch('amount')} {wallets.find((e: any) => e.address === form.watch('wallet'))?.currency}</p>

            
            </div>
            <DialogFooter>
            <Button type="submit">Пополнить</Button>
            </DialogFooter>
            </form>
            </Form>
        </DialogContent>
        </Dialog>
    )
}
