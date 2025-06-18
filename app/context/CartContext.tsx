"use client"
import React, { createContext, useContext, useState } from "react"

const CartContext = createContext(null)

export default function CartProvider({ children }) {
  const [cart, setCart] = useState([])

  const addToCart = (product) => {
    setCart((prev) => [...prev, product])
  }

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id))
  }

  const clearCart = () => {
    setCart([])
  }

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
