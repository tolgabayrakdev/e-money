"use client"

import { useState } from "react"


export default function Home() {
  const [changeVisible, setChangeVisible] = useState(false);
  return (
    <main>
      <div className="h-screen flex justify-center flex-col items-center">
        <h1 className="text-3xl mb-4">Home page</h1>
        <h4>You can authentication here.</h4>
        <button onClick={() => setChangeVisible(!changeVisible)} className="border-2 m-1 mb-12 p-1 rounded-lg w-24 bg-red-500 text-white border-red-500 active:bg-red-600 duration-300">{changeVisible ? "Log in" : "Register"}</button>
        <div>
          {
            changeVisible ?
              <form>
                <div className="flex flex-col">
                  <h4 className="text-center text-red-500 mb-1">Login here</h4>
                  <input type="email" name="email" id="email" placeholder="Email" className=" border p-1 rounded-lg border-black mb-1" />
                  <input type="password" name="password" id="password" placeholder="Password" className=" border p-1 rounded-lg border-black" />
                  <button type="submit" className="border mt-1 rounded-md border-blue-400">Submit</button>
                </div>

              </form>
              :
              <form>
                <div className="flex flex-col">
                  <h4 className="text-center text-red-500 mb-1">Register here</h4>
                  <input type="text" name="username" id="useranem" placeholder="Username" className=" border p-1 rounded-lg border-black mb-1" />
                  <input type="email" name="email" id="email" placeholder="Email" className=" border p-1 rounded-lg border-black mb-1" />
                  <input type="password" name="password" id="password" placeholder="Password" className=" border p-1 rounded-lg border-black" />
                  <button type="submit" className="border mt-1 rounded-md border-blue-500 bg-blue-500 text-white">Register</button>
                </div>
              </form>
          }



        </div>

      </div>
    </main>
  )
}
