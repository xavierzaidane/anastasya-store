import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const search = searchParams.get('search') || ''; 
  const category = searchParams.get('category'); 
  const page = parseInt(searchParams.get('page') || '1', 10); 
  const limit = parseInt(searchParams.get('limit') || '10', 10); 
  const skip = (page - 1) * limit;

  try {
    const products = await prisma.product.findMany({
      where: {
        name: {
          contains: search,
          mode: 'insensitive',
        },
        ...(category && { category: { slug: category } }),
      },
      skip,
      take: limit,
      include: {
        category: true, 
      },
    });

    const totalProducts = await prisma.product.count({
      where: {
        name: {
          contains: search,
          mode: 'insensitive',
        },
        ...(category && { category: { slug: category } }),
      },
    });

    return NextResponse.json({
      data: products,
      meta: {
        total: totalProducts,
        page,
        limit,
        totalPages: Math.ceil(totalProducts / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}


export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, price, categoryId, description, img, items } = body;
    if (!name || !price || !categoryId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const slug = name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');

    const product = await prisma.product.create({
      data: {
        name,
        slug, 
        price,
        description,
        items: items ?? [],
        image: img,
        rating: 0,
        reviewCount: 0,
        category: {
          connect: { id: categoryId },
        },
      },
    });

    return NextResponse.json({ data: product }, { status: 201 });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
  }
}