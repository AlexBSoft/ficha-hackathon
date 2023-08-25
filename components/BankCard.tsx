"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation'

import {
    ArrowDownIcon,
    ArrowUpIcon,
    CheckIcon,
    CopyIcon,
    Cross2Icon,
    DotsHorizontalIcon,
    DrawingPinFilledIcon,
    DrawingPinIcon,
    OpenInNewWindowIcon,
    PlusIcon,
    Share2Icon,
  } from '@radix-ui/react-icons';
import {
    Avatar,
    Badge,
    Box,
    Card,
    Checkbox,
    Flex,
    Grid,
    Heading,
    IconButton,
    Link,
    Separator,
    Strong,
    Switch,
    Text,
    TextField,
    Theme,
  } from '@radix-ui/themes';
// Supabase - в него мы грузим данные
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { card_number_to_chuks } from "@/scripts/scripts";


export function BankCard({ number, name, cardholder, balance, bank_logo, expire_date, cvv, currency, id }: {  number?: any, name?: any, cardholder?: any, balance?: any, bank_logo?: any,  expire_date?: any, cvv?: any, currency?:any, id?: any} ) {

    return (
        <Box
            style={{
              borderRadius: 'var(--radius-4)',
              color: "white"
            }}
            className='hover:shadow-xl'
          >
              <Flex
                direction="column"
                justify="between"
                style={
                  {
                    height: 168,
                    width: 300,
                    position: 'relative',
                    background: 'linear-gradient(to top right, hsl(226, 70.0%, 55.5%), #E18BFF)',
                    boxShadow: '0 1px 20px -5px #7971E9AA',
                    borderRadius: '6px',
                    '--gray-12': 'white',
                  } as React.CSSProperties
                }
                
              >
                <Text weight="medium" mt="3" mx="3" size="2">
                  {cardholder}
                </Text>
                <img src={bank_logo} style={{position:'absolute', top: "12px", right: 0, height: "32px"}}/>
                <Box>
                  <Flex align="center" gap="3" mb="1" mx="3">
                    <Text size="2">
                    {card_number_to_chuks(number)}
                    </Text>
                    <IconButton tabIndex={-1} variant="ghost" color="gray" size="1" highContrast>
                      <CopyIcon />
                    </IconButton>
                  </Flex>
                  <Flex gap="3" mb="2" mx="3">
                    <Text size="2">{expire_date}</Text>
                    <Text size="2">{cvv}</Text>
                    <Text size="2">{balance}</Text>
                    <Text size="2">{currency}</Text>
                  </Flex>
                </Box>
              </Flex>
          </Box>
    )
}
