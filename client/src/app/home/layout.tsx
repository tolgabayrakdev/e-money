"use client"
import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <h1 className=" text-4xl">Home Layout!</h1>
        {children}
        </body>
    </html>
  )
}
