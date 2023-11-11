'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';

function AuthWrapper(WrapperComponent: any) {
    const Wrapper = (props: any) => {
        const [loggedIn, setLoggedIn] = useState(false);
        const [loading, setLoading] = useState(true);
        const [sessionExpired, setSessionExpired] = useState(false);
        const [accessDenied, setAccessDenied] = useState(false);
        const [userInfo, setUserInfo] = useState({});

        useEffect(() => {
            const verifyToken = async () => {
                try {
                    const res = await fetch(
                        'http://localhost:8000/api/v1/auth/verify',
                        {
                            method: 'POST',
                            credentials: 'include',
                        },
                    );
                    const data = await res.json();
                    if (res.ok) {
                        setLoggedIn(true);
                        setUserInfo(data);
                        setLoading(false);
                    } else if (res.status === 401) {
                        setLoading(false);
                        setSessionExpired(true);
                    } else {
                        setLoading(false);
                        setAccessDenied(true);
                    }
                } catch (error) {
                    setAccessDenied(true);
                    setLoading(false);
                }
            };
            verifyToken();
        }, []);

        if (loading) {
            return (
                <section className="flex h-screen justify-center items-center text-xl text-blue-600">
                    Loading...
                </section>
            );
        }
        if (accessDenied) {
            return (
                <section className="flex flex-col h-screen justify-center items-center text-xl text-red-600">
                    Access denied!{' '}
                    <Link
                        className=" hover:underline text-blue-600 text-sm"
                        href="/"
                    >
                        Go home
                    </Link>{' '}
                </section>
            );
        }
        if (sessionExpired) {
            return (
                <section className="flex h-screen justify-center items-center text-xl">
                    Sorry, your session has expired.
                </section>
            );
        }
        return (
            <section>
                <WrapperComponent userInformation={userInfo} {...props} />
            </section>
        );
    };
    return Wrapper;
}

export default AuthWrapper;
