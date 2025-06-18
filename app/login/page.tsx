"use client"
import { signIn, signOut, useSession } from "next-auth/react"

export default function LoginPage() {
  const { data: session } = useSession()

  if (session) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <p className="mb-4 text-lg text-black ">Olá, {session.user?.name}!</p>
        <button
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          onClick={() => signOut()}
        >
          Sair
        </button>
      </main>
    )
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <button
        className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700"
        onClick={() => signIn("google")}
      >
        Entrar com Google
      </button>
    </main>
  )
}
