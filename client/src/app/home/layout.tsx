"use client"
import AuthWrapper from "@/util/auth-wrapper";

function HomeLayout({
  userInformation,
  children
}: {
  children: React.ReactNode,
  userInformation: any
}) {
  console.log(userInformation.user);
  
  return (
    <section>
      <h1 className=" text-4xl">Home Layout!</h1>
      <div className="flex"> Welcome:<p className="text-blue-600">{userInformation.user.username}</p> </div>
      <div className="flex">Email: <p className="text-blue"> {userInformation.user.email}</p></div>
      {children}
    </section>
  )
}

export default AuthWrapper(HomeLayout);