"use client"
import AuthWrapper from "@/util/auth-wrapper";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Account = {
  id: string
  account_type_id: number
  balance: number
  created_at: string
}

function HomeLayout({
  userInformation,
  children
}: {
  children: React.ReactNode,
  userInformation: any
}) {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const router = useRouter();


  const handleGetAccounts = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/v1/account", {
        method: "GET",
        credentials: "include"
      });
      const data = await res.json();
      setAccounts(data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    handleGetAccounts();
  }, [])


  const handleLogout = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/v1/auth/logout",{
        method: "POST",
        credentials: "include"
      });
      if (res.ok) {
        router.push("/")
      }
    } catch (error) {
      console.log(error);
      
    }
  }


  return (
    <section>
      <header className="flex flex-wrap sm:justify-start sm:flex-nowrap z-50 w-full bg-white text-sm py-4 dark:bg-gray-800">
        <nav className="max-w-[85rem] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between" aria-label="Global">
          <div className="flex items-center justify-between">
            <a className="flex-none text-xl font-semibold dark:text-white" href="#">e-money</a>
            <div className="sm:hidden">
              <button type="button" className="hs-collapse-toggle p-2 inline-flex justify-center items-center gap-x-2 rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-transparent dark:border-gray-700 dark:text-white dark:hover:bg-white/10 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" data-hs-collapse="#navbar-with-collapse" aria-controls="navbar-with-collapse" aria-label="Toggle navigation">
                <svg className="hs-collapse-open:hidden flex-shrink-0 w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" x2="21" y1="6" y2="6" /><line x1="3" x2="21" y1="12" y2="12" /><line x1="3" x2="21" y1="18" y2="18" /></svg>
                <svg className="hs-collapse-open:block hidden flex-shrink-0 w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
              </button>
            </div>
          </div>
          <div id="navbar-with-collapse" className="hidden basis-full grow sm:block">
            <div className="flex flex-col gap-5 mt-5 sm:flex-row sm:items-center sm:justify-end sm:mt-0 sm:ps-5">
              <p onClick={handleLogout} className="font-medium text-gray-600 underline hover:cursor-pointer hover:text-gray-300 dark:text-gray-400 dark:hover:text-gray-300 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">Log out</p>
            </div>
          </div>
        </nav>
      </header>
      <div className="flex h-48">
        <div className="container p-6 border">
          <h3 className="text-center text-xl underline italic text-gray-800 hover:text-gray-700">User Information</h3>
          <div className="flex justify-center items-center flex-col mt-8">
            <div className="flex"> Welcome:<p className="text-blue-600 ml-1">{userInformation.user.username}</p> </div>
            <div className="flex">Email: <p className="text-blue-600 ml-1"> {userInformation.user.email}</p></div>
          </div>

        </div>
        <div className=" container p-6 border">
          <h3 className="text-center underline text-xl italic text-gray-800 hover:text-gray-700">Account</h3>
          {
            accounts.map((account) => (
              <div key={account.id} className="border p-3 rounded-md">
                <p>id: {account.id} </p>
                <p>type_id: {account.account_type_id == 1 ? "personal" : ""} </p>
                <p>balance: {account.balance} TL </p>
                <p>created date: {account.created_at} </p>
              </div>
            ))
          }

        </div>
      </div>
      <div className="border p-6 text-center h-[40rem]">

        {children}

      </div>
      <footer>
        <p className="ml-2 mt-1">e-money version: v0.0.0</p>
      </footer>
    </section>
  )
}

export default AuthWrapper(HomeLayout);