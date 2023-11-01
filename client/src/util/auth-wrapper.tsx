"use client"
import { useEffect, useState } from "react"

function AuthWrapper(WrapperComponent: any) {
    const Wrapper = (props: any) => {
        const [loggedIn, setLoggedIn] = useState(false);
        const [loading, setLoading] = useState(true);
        const [sessionExpired, setSessionExpired] = useState(false);
        const [accessDenied, setAccessDenied] = useState(false);

        useEffect(() => {
            const verifyToken = async () => {
                try {
                    const res = await fetch("", {
                        method: "POST",
                        credentials: "include"
                    });
                    if (res.ok) {
                        setLoggedIn(true);
                        setLoading(false);
                    }else if (res.status === 401) {
                        setLoading(false);
                        setSessionExpired(true);
                    }
                } catch (error) {
                    setAccessDenied(true);
                    setLoading(false);
                }
            }
            verifyToken();
        }, [])


        if (loading) {
            return(<section>Loading...</section>)
        }
        if (accessDenied) {
            return(<section>Access denied!</section>)
        }
        if (sessionExpired) {
            return(<section>Sorry, your session has expired.</section>)
        }

        return(<section><WrapperComponent {...props}/> </section>)

    }
    return Wrapper;

}

export default AuthWrapper;