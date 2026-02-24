import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';


// GET - List all categories with product count
export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      include: {
        _count: {
          select: { products: true },
        },
      },
    });

    const categoriesWithCount = categories.map((category) => ({
      ...category,
      productCount: category._count.products,
      _count: undefined,
    }));

    return NextResponse.json(categoriesWithCount, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    );
  }
}

// POST - Create category (Admin only)
export async function POST(request: NextRequest) {
  try {
    // TODO: Add authentication middleware to verify admin role
    const body = await request.json();
    const { slug, name, image } = body;

    // Validate required fields
    if (!slug || !name) {
      return NextResponse.json(
        { error: 'slug and name are required' },
        { status: 400 }
      );
    }

    // Check if category with same slug already exists
    const existingCategory = await prisma.category.findUnique({
      where: { slug },
    });

    if (existingCategory) {
      return NextResponse.json(
        { error: 'Category with this slug already exists' },
        { status: 409 }
      );
    }

    const category = await prisma.category.create({
      data: {
        slug,
        name,
        image: image || null,
      },
    });

    return NextResponse.json(category, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create category' },
      { status: 500 }
    );
  }
}