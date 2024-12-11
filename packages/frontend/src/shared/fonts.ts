import { Roboto ,Inter } from 'next/font/google'


export const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
  variable: '--main-text-family'
})

export const inter = Inter({
  weight: '700',
  subsets: ['latin'],
  variable: '--title-text-family'
})