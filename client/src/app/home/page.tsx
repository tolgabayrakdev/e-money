'use client';
import React, { useEffect, useState } from 'react';

export default function page({ props }: any) {
    const [transactionList, setTransactionList] = useState([]);

    const handleGetTransaction = async () => {
        try {
            const res = await fetch(
                `http://localhost:8000/api/v1/transaction/${localStorage.getItem(
                    'source_account_id',
                )}`,
                {
                    method: 'GET',
                    credentials: 'include',
                },
            );
            const data = await res.json();
            console.log(data);

            setTransactionList(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        handleGetTransaction();
    }, []);
    return (
        <div>
            Home page
            <div className="border mt-3 h-[18rem] w-full">
                <h3 className="text-xl mt-1 underline italic">
                    Transaction History
                </h3>
                {transactionList.map((item: any) => (
                    <div key={item.id}>
                        <p>Source account id: {item.source_account_id} </p>
                        <p>Amount: {item.amount} </p>
                        <p>Transaction date {item.transaction_date} </p>
                    </div>
                ))}
            </div>
        </div>
    );
}
