"use client"
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex h-screen justify-center items-center bg-gradient-to-r from-gray-500 to-teal-700">
      <div className="border p-3 rounded-md border-teal-300 pl-4 pr-4">
        <h3 className="text-xl text-white">Welcome the e-money</h3>
        <Link className="block text-center text-white mt-1 hover:underline" href="/login">Log in here.</Link>
      </div>
    </main>
  )
}
