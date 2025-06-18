import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

//Lista todos os produtos
export async function GET() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
  })
  return NextResponse.json(products)
}

//Cria um novo produto
export async function POST(req: NextRequest) {
  const body = await req.json()

  const { name, description, price, imageUrl } = body

  if (!name || !price) {
    return NextResponse.json({ error: "Nome e preço são obrigatórios" }, { status: 400 })
  }

  const newProduct = await prisma.product.create({
    data: {
      name,
      description,
      price,
      imageUrl,
    },
  })

  return NextResponse.json(newProduct, { status: 201 })
}
