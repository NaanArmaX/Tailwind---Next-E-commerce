"use client"
import React, { useEffect, useState } from "react"

type Product = {
  id: number
  name: string
  description?: string
  price: number
  imageUrl?: string
}

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/products")
        const data = await res.json()
        setProducts(data)
      } catch (err) {
        console.error("Erro ao carregar produtos", err)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  return (
    <main className="max-w-7xl mx-auto px-6 py-16">
      {/* Hero Section */}
      <section className="flex flex-col-reverse md:flex-row items-center gap-12 md:gap-24 mb-10">
        <div className="flex-1 max-w-lg">
          <h1 className="text-5xl font-extrabold text-gradient bg-gradient-to-r leading-tight mb-6">
            Encontre seus produtos favoritos com facilidade
          </h1>
          <p className="text-white-600 text-lg mb-8 leading-relaxed">
            Descubra a melhor seleção de produtos, preços imbatíveis e entrega rápida. Tudo isso com a qualidade que você merece.
          </p>
          <button className="bg-indigo-600 hover:bg-indigo-700 transition rounded-lg px-8 py-3 text-white font-semibold shadow-lg shadow-indigo-300/30">
            Ver produtos
          </button>
        </div>
        <div className="flex-1 mb-10">
          <img
            src="https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=700&q=50"
            alt="Produtos em destaque"
            className="rounded-3xl shadow-2xl border border-gray-200 max-h-[700px] object-cover w-full"
          />
        </div>
      </section>

      {/* Produtos em Destaque */}
      <section>
        <h2 className="text-3xl font-bold text-white-800 mb-10 border-b border-gray-200 pb-2">
          Produtos em destaque
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-lg transition dark:bg-gray-800 dark:border-gray-700"
            >
              <img
                className="rounded-t-lg h-48 w-full object-cover"
                src={
                  product.imageUrl ||
                  "https://via.placeholder.com/300x200?text=Sem+imagem"
                }
                alt={product.name}
              />
              <div className="p-5">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {product.name}
                </h5>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 line-clamp-2">
                  {product.description || "Sem descrição."}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-blue-600 font-bold text-lg">
                    R$ {product.price.toFixed(2)}
                  </span>
                  <button
                    onClick={() => addToCart(product)}
                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800"
                  >
                    Adicionar No Carrinho
                    <svg
                      className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 10"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M1 5h12m0 0L9 1m4 4L9 9"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
