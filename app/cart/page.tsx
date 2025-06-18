"use client"

import { useCart } from "../context/CartContext"

export default function CartPage() {
  const { cart, removeFromCart, clearCart } = useCart()

  if (cart.length === 0) {
    return (
      <div className="p-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Seu carrinho está vazio</h1>
        <p>Adicione alguns produtos para começar.</p>
      </div>
    )
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Carrinho</h1>

      <ul className="space-y-4">
        {cart.map((item) => (
          <li
            key={item.id}
            className="flex items-center justify-between border p-4 rounded"
          >
            <div className="flex items-center space-x-4">
              <img
                src={item.imageUrl}
                alt={item.name}
                className="w-20 h-20 object-cover rounded"
              />
              <div>
                <h2 className="font-semibold">{item.name}</h2>
                <p>R$ {item.price.toFixed(2)}</p>
              </div>
            </div>
            <button
              onClick={() => removeFromCart(item.id)}
              className="text-red-600 hover:underline"
            >
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button
        onClick={clearCart}
        className="mt-6 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
      >
        Limpar Carrinho
      </button>
    </div>
  )
}
