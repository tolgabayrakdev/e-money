'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';

export default function Home() {
    const [changeVisible, setChangeVisible] = useState(false);
    const [openFirstSnackbar, setOpenFirstSnackbar] = useState(false);
    const [openSecondSnackbar, setOpenSecondSnackbar] = useState(false);
    const [createdSnackbar, setCreatedSnackbar] = useState(false);
    const [loading, setLoading] = useState(false);

    // Register.
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Login.
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');

    const router = useRouter();

    const handleRegister = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch(
                'http://localhost:8000/api/v1/auth/register',
                {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ username, email, password }),
                },
            );
            if (res.ok) {
                setCreatedSnackbar(true);
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            } else {
                setOpenFirstSnackbar(true);
            }
        } catch (error) {
            console.log(error);
            setOpenFirstSnackbar(true);
        }
    };

    const handleLogin = async (e: FormEvent) => {
        setLoading(true);
        e.preventDefault();
        try {
            const res = await fetch('http://localhost:8000/api/v1/auth/login', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: loginEmail,
                    password: loginPassword,
                }),
            });
            if (res.ok) {
                setTimeout(() => {
                    router.push('/home');
                    setLoading(false);
                }, 1000);
            } else {
                setLoading(false);
                setOpenSecondSnackbar(true);
            }
        } catch (error) {
            console.log(error);
            setOpenSecondSnackbar(true);
        }
    };

    return (
        <main>
            <div className="h-screen flex justify-center flex-col items-center">
                <h4 className="text-xl">You can authentication here.</h4>
                <button
                    onClick={() => setChangeVisible(!changeVisible)}
                    className="border-2 m-1 p-1 mb-3 rounded-lg w-46 bg-red-500 text-white border-red-500 active:bg-red-600 duration-300"
                >
                    {changeVisible ? 'Go to register' : 'Go to login'}
                </button>
                <hr className="bg-blue-600 w-56 mb-4" />
                {loading ? (
                    <p className="text-xl text-blue-500">Loading...</p>
                ) : (
                    <div>
                        {changeVisible ? (
                            <form onSubmit={handleLogin}>
                                <div className="flex flex-col">
                                    <h4 className="text-center text-blue-600 mb-1">
                                        Login here
                                    </h4>
                                    {openSecondSnackbar ? (
                                        <p className="text-center text-red-600 w-52">
                                            Error, check your email or password!
                                        </p>
                                    ) : (
                                        ''
                                    )}
                                    <input
                                        onChange={(e) =>
                                            setLoginEmail(e.target.value)
                                        }
                                        type="email"
                                        name="email"
                                        id="email"
                                        placeholder="Email"
                                        className=" border-2 p-1 rounded-md border-blue-400 mb-1"
                                    />
                                    <input
                                        onChange={(e) =>
                                            setLoginPassword(e.target.value)
                                        }
                                        type="password"
                                        name="password"
                                        id="password"
                                        placeholder="Password"
                                        className=" border-2 p-1 rounded-md border-blue-400"
                                    />
                                    <Link
                                        className=" text-sm mt-1 hover:underline hover:text-gray-800"
                                        href="/"
                                    >
                                        Forget password ?
                                    </Link>
                                    <button
                                        type="submit"
                                        className="border mt-3 rounded-md border-blue-500 p-1 bg-blue-500 text-white"
                                    >
                                        Submit
                                    </button>
                                </div>
                            </form>
                        ) : (
                            <form onSubmit={handleRegister}>
                                <div className="flex flex-col">
                                    <h4 className="text-center text-blue-600 mb-1">
                                        Register here
                                    </h4>
                                    {openFirstSnackbar ? (
                                        <p className="text-center text-red-500">
                                            Hata!
                                        </p>
                                    ) : (
                                        ''
                                    )}
                                    {createdSnackbar ? (
                                        <p className="text-center text-green-500 w-52">
                                            Account created succesful. You are
                                            redirected to login page...{' '}
                                        </p>
                                    ) : (
                                        <section className="flex flex-col">
                                            {' '}
                                            <input
                                                onChange={(e) =>
                                                    setUsername(e.target.value)
                                                }
                                                type="text"
                                                name="username"
                                                id="useranem"
                                                placeholder="Username"
                                                className=" border-2 p-1 rounded-md border-blue-400 mb-1"
                                            />
                                            <input
                                                onChange={(e) =>
                                                    setEmail(e.target.value)
                                                }
                                                type="email"
                                                name="email"
                                                id="email"
                                                placeholder="Email"
                                                className=" border-2 p-1 rounded-md border-blue-400 mb-1"
                                            />
                                            <input
                                                onChange={(e) =>
                                                    setPassword(e.target.value)
                                                }
                                                type="password"
                                                name="password"
                                                id="password"
                                                placeholder="Password"
                                                className=" border-2 p-1 rounded-md border-blue-400"
                                            />
                                            <button
                                                type="submit"
                                                className="border mt-3 rounded-md border-blue-500 p-1 bg-blue-500 text-white"
                                            >
                                                Register
                                            </button>
                                        </section>
                                    )}
                                </div>
                            </form>
                        )}
                    </div>
                )}
            </div>
        </main>
    );
}
