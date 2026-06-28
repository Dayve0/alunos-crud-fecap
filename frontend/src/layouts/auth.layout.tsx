export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <main className="w-dvw h-dvh bg-white flex flex-col gap-4 justify-center items-center transition-all ease-in-out duration-300">
            {children}
        </main>
    )
}