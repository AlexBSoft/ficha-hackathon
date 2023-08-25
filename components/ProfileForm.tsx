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
import { Checkbox } from "./ui/checkbox";

const formSchema = z.object({
    fio: z.string(),
    passport: z.string(),
    birthdate: z.string(),
    inn: z.string(),
})

function getRandomIntInclusive(min: any, max: any) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
}

export function ProfileForm({bank_id, currency}: {bank_id?: string, currency?: string}) {

    const supabase = createClientComponentClient()
    const router = useRouter()

    const searchParams = useSearchParams();    

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            fio: "",
            passport: "",
            birthdate: "",
            inn: ""
        },
    })

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        // console.log(values)

        // const { data: ddata, error: derror } = await supabase
        // .from('cards')
        // .insert({ cardholder: values.fio, bank_id: bank_id, currency: currency, expire_date: "08/30", cvv:getRandomIntInclusive(100,999),number: generateBankCardNumber() })
        // .select()

        // if(derror)
        //     return toast.error('Ошибка сохранения профиля')

    }


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="fio"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>ФИО пользователя</FormLabel>
                            <FormControl>
                                <Input placeholder="ФИО пользователя" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="passport"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Серия номер паспорта</FormLabel>
                            <FormControl>
                                <Input placeholder="1234 666333" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="birthdate"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Дата рождения</FormLabel>
                            <FormControl>
                                <Input placeholder="11.09.2001" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="inn"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>ИНН</FormLabel>
                            <FormControl>
                                <Input placeholder="1234666333" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

            <div className="flex items-center space-x-2">
                <Checkbox id="terms" checked={true}/>
                <label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                    Получать почтовые уведомления
                </label>
                </div>

                <Button type="submit" className="w-full">Сохранить</Button>
            </form>
        </Form>
    )
}
