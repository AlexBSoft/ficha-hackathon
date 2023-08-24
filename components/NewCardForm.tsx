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

const formSchema = z.object({
    fio: z.string(),
    bank: z.string(),
    currency: z.string(),
})

function generateBankCardNumber() {
    var prefixList = ["4539", "4556", "4916", "4532", "4929", "40240071", "4485", "4716", "4"];
    var length = 16;
    
    // Select a random prefix from the prefix list
    var randomPrefix = prefixList[Math.floor(Math.random() * prefixList.length)];
    
    // Generate the remaining digits of the card number
    var ccnumber = randomPrefix;
    while (ccnumber.length < (length - 1)) {
      ccnumber += Math.floor(Math.random() * 10);
    }
    
    // Calculate the check digit
    var reversedCCnumberString = ccnumber.split("").reverse().join("");
    var reversedCCnumber = reversedCCnumberString.split("").map(Number);
    var sum = 0;
    var pos = 0;
    var odd = false;
    
    while (pos < length - 1) {
      odd = !odd;
      var digit = reversedCCnumber[pos];
      if (odd) {
        digit *= 2;
        if (digit > 9) {
          digit -= 9;
        }
      }
      sum += digit;
      pos++;
    }
    
    var checkDigit = (10 - (sum % 10)) % 10;
    ccnumber += checkDigit;
    
    return ccnumber;
  }
  function getRandomIntInclusive(min: any, max: any) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
  }

export function NewCardForm() {

    const supabase = createClientComponentClient()
    const router = useRouter()

    const form = useForm<z.infer<typeof formSchema>>({
        //resolver: zodResolver(formSchema),
        defaultValues: {
            fio: "",
            bank: "",
            currnecy: "rub"
        },
    })

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)

        const { data: ddata, error: derror } = await supabase
        .from('cards')
        .insert({ cardholder: values.fio, bank: values.bank, currency: values.currnecy, expire_date: "08/30", cvv:getRandomIntInclusive(100,999),number: generateBankCardNumber() })
        .select()

        if(derror)
            return toast.error('Ошибка создания NFT')

        // После - открываем страницу созданного NFT
        router.push(`/cards/${ddata[0].id}`)
    }


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="fio"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>ФИО держателя</FormLabel>
                            <FormControl>
                                <Input placeholder="ФИО" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="bank"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Банк карты</FormLabel>
                            <FormControl>
                                <Input placeholder="Банк" {...field} />
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
                            <FormLabel>Банк карты</FormLabel>
                            <FormControl>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Валюта" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                    <SelectLabel>Валюта</SelectLabel>
                                    <SelectItem value="rub">Рубли</SelectItem>
                                    <SelectItem value="cny">Китайские Юани</SelectItem>
                                    <SelectItem value="brl">Бразильский реал</SelectItem>
                                    <SelectItem value="inr">Индийская рупия</SelectItem>
                                    <SelectItem value="zar">Южноафриканский рэнд</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />




                <Button type="submit">Создать</Button>
            </form>
        </Form>
    )
}
