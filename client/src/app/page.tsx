"use client"
import Link from "next/link";
import { useState } from "react"

export default function Home() {
  const [changeVisible, setChangeVisible] = useState(false);
  return (
    <main>
      <div className="h-screen flex justify-center flex-col items-center">
        <h4 className="text-xl">You can authentication here.</h4>
        <button onClick={() => setChangeVisible(!changeVisible)} className="border-2 m-1 p-1 mb-3 rounded-lg w-46 bg-red-500 text-white border-red-500 active:bg-red-600 duration-300">{changeVisible ? "Go to register" : "Go to login"}</button>
        <hr className="bg-blue-600 w-56 mb-4" />
        <div>
          {
            changeVisible ?
              <form>
                <div className="flex flex-col">
                  <h4 className="text-center text-blue-600 mb-1">Login here</h4>
                  <input type="email" name="email" id="email" placeholder="Email" className=" border-2 p-1 rounded-md border-blue-400 mb-1" />
                  <input type="password" name="password" id="password" placeholder="Password" className=" border-2 p-1 rounded-md border-blue-400" />
                  <Link className=" text-sm mt-1 hover:underline hover:text-gray-800" href="">Forget password ?</Link>
                  <button type="submit" className="border mt-3 rounded-md border-blue-500 p-1 bg-blue-500 text-white">Submit</button>
                </div>

              </form>
              :
              <form>
                <div className="flex flex-col">
                  <h4 className="text-center text-blue-600 mb-1">Register here</h4>
                  <input type="text" name="username" id="useranem" placeholder="Username" className=" border-2 p-1 rounded-md border-blue-400 mb-1" />
                  <input type="email" name="email" id="email" placeholder="Email" className=" border-2 p-1 rounded-md border-blue-400 mb-1" />
                  <input type="password" name="password" id="password" placeholder="Password" className=" border-2 p-1 rounded-md border-blue-400" />
                  <button type="submit" className="border mt-3 rounded-md border-blue-500 p-1 bg-blue-500 text-white">Register</button>
                </div>
              </form>
          }
        </div>
      </div>
    </main>
  )
}
