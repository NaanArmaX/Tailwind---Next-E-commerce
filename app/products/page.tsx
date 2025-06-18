import React from "react"

type Product = {
  id: number
  name: string
  description?: string
  price: number
  imageUrl?: string
}

async function getProducts(): Promise<Product[]> {
  const res = await fetch("http://localhost:3000/api/products", { cache: "no-store" })
  if (!res.ok) throw new Error("Falha ao carregar produtos")
  return res.json()
}

export default async function ProductsPage() {
  const products = await getProducts()

  return (
    <main className="max-w-5xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Produtos</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="border rounded-md p-4 shadow hover:shadow-lg transition">
            {product.imageUrl && (
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-48 object-cover rounded"
              />
            )}
            <h2 className="text-xl font-semibold mt-2">{product.name}</h2>
            <p className="text-gray-600 mt-1">{product.description}</p>
            <p className="mt-3 font-bold text-lg">R$ {product.price.toFixed(2)}</p>
          </div>
        ))}
      </div>
    </main>
  )
}
