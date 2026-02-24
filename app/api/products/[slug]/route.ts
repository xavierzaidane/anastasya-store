import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';


// GET: Get product by slug (with colors, category, reviews)
export async function GET(req: Request, { params }: { params: { slug: string } }) {
  const { slug } = params;

  try {
    const product = await prisma.product.findUnique({
      where: { slug },
      include: {
        category: true, // Include category details
        reviews: true,  // Include reviews
      },
    });

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json({ data: product });
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json({ error: 'Failed to fetch product' }, { status: 500 });
  }
}

// PUT: Update product (Admin only)
export async function PUT(req: Request, { params }: { params: { slug: string } }) {
  const { slug } = params;

  try {
    const body = await req.json();
    const { name, price, description, image, stock, categoryId } = body;

    // Validate required fields
    if (!name || !price || !categoryId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const updatedProduct = await prisma.product.update({
      where: { slug },
      data: {
        name,
        price,
        description,
        image,
        category: {
          connect: { id: categoryId },
        },
      },
    });

    return NextResponse.json({ data: updatedProduct });
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json({ error: 'Failed to update product' }, { status: 500 });
  }
}

// DELETE: Delete product (Admin only)
export async function DELETE(req: Request, { params }: { params: { slug: string } }) {
  const { slug } = params;

  try {
    const deletedProduct = await prisma.product.delete({
      where: { slug },
    });

    return NextResponse.json({ data: deletedProduct });
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 });
  }
}