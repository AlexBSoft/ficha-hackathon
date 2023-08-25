/* eslint-disable */
"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation'

import { Button } from "@/components/ui/button"
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
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { Input } from "@/components/ui/input"

// Supabase - в него мы грузим данные
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

import { useForm, SubmitHandler } from "react-hook-form"


import { useSearchParams } from 'next/navigation';
import { BankCard } from "./BankCard";

const formSchema = z.object({
    name: z.string(),
    country: z.string(),
    currency: z.string(),
    logo: z.string(),
    card_style: z.string(),
})


export function NewAdminBankForm({}: {}) {

    const supabase = createClientComponentClient()
    const router = useRouter()

    const searchParams = useSearchParams();    

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            country: "",
            currency: "rub",
            logo: "",
            card_style: ""
        },
    })

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)

        const { data: ddata, error: derror } = await supabase
        .from('banks')
        .insert({ name: values.name,
        country: values.country,
        currency: values.currency,
        logo: values.logo,
        card_style: values.card_style })
        .select()

        if(derror)
            return toast.error('Ошибка создания банка')

        // После - открываем страницу карты
        router.push(`/banks/${ddata[0].id}`)
    }


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Название</FormLabel>
                            <FormControl>
                                <Input placeholder="" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="country"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Страна</FormLabel>
                            <FormControl>
                                <Input placeholder="country" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />


                <FormField
                    control={form.control}
                    name="currency"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Валюта</FormLabel>
                            <FormControl>
                                <Input placeholder="currency" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="logo"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Ссылка на логотип http</FormLabel>
                            <FormControl>
                                <Input placeholder="Лого" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="card_style"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Стиль карты.</FormLabel>
                            <FormControl>
                                <Input placeholder="CSS стиль" {...field} />
                            </FormControl>
                            <FormDescription>
                                CSS Градиент или просто CSS бэкграунд для отображения в карточке. Например: `linear-gradient(to right top, rgb(132 153 80), rgb(22 99 25))`
                            </FormDescription>    
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <BankCard id={"1999"} number={"4242424242424242"} cardholder={"Cradholder Name"} currency={form.watch("currency") || "rub"} bank_logo={form.watch("logo")} card_style={form.watch('card_style')}  />

                <Button type="submit" className="w-full">Создать</Button>
            </form>
        </Form>
    )
}
