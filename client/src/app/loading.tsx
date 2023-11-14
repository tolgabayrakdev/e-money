import React from 'react'

type Props = {}

export default function loading({ }: Props) {
    return (
        <div className='flex h-screen justify-center items-center text-xl bg-gradient-to-r from-gray-700 to-teal-800 text-white'>Loading...</div>
    )
}