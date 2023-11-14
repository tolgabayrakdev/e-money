export default function AuthLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <section className="flex h-screen justify-center items-center bg-gradient-to-r from-gray-700 to-teal-800">
            {children}
        </section>
    )
}
