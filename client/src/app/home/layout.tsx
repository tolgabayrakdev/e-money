"use client"
import AuthWrapper from "@/util/auth-wrapper";

function HomeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <h1 className=" text-4xl">Home Layout!</h1>
        {children}
        </body>
    </html>
  )
}

export default AuthWrapper(HomeLayout);