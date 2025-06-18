"use client"
import { FaUserCircle, FaShoppingCart, FaSearch } from "react-icons/fa"
import { useSession, signIn, signOut } from "next-auth/react"
import React, { useState } from "react"
import { useCart } from "../context/CartContext"
import { useRouter } from "next/navigation";
import Link from "next/link"


export default function Header() {
  const { data: session } = useSession()
  const [search, setSearch] = useState("")
  const { totalItems } = useCart()
  const router = useRouter();
  const { cart } = useCart()


  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert(`Procurando por: ${search}`)
  }

  return (
    <header className="bg-white shadow p-4 flex items-center justify-between">
      <Link href="/">
        <div className="text-2xl font-bold text-indigo-600 cursor-pointer">
            MeuEcommerce
        </div>
        </Link>

      <form
        onSubmit={handleSearchSubmit}
        className="flex items-center border rounded-md overflow-hidden max-w-md w-full"
        >
        <input
          type="text"
          placeholder="Buscar produtos..."
          className="flex-grow px-4 py-2 outline-none text-black placeholder-gray-400"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
            type="submit"
         className="bg-indigo-600 px-5 py-2 rounded-md text-white hover:bg-indigo-700 transition flex items-center justify-center"
             aria-label="Buscar"
        >
          <FaSearch />
        </button>
      </form>

      <div className="flex items-center space-x-6">
        <button
        aria-label="Carrinho"
        className="relative text-gray-700 hover:text-indigo-600 transition"
        onClick={() => router.push("/cart")}
        >
        <FaShoppingCart size={24} />
        {cart.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
            {cart.length}
            </span>
        )}
        </button>

        {session ? (
          <div
            className="flex items-center space-x-3 cursor-pointer"
            onClick={() => signOut()}
          >
            {session.user?.image ? (
              <img
                src={session.user.image}
                alt={session.user?.name || "Usuário"}
                className="w-9 h-9 rounded-full object-cover"
              />
            ) : (
              <FaUserCircle size={36} className="text-gray-400" />
            )}
            <span className="font-medium text-gray-700">{session.user?.name}</span>
          </div>
        ) : (
          <button
            onClick={() => signIn()}
            className="text-indigo-600 font-semibold hover:underline"
          >
            Entrar
          </button>
        )}
      </div>
    </header>
  )
}
