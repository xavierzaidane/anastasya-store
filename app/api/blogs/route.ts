import { NextResponse } from 'next/server';
import { blogPosts } from '@/data/blog';

export async function GET() {
  try {
    return NextResponse.json(blogPosts);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch blog posts' },
      { status: 500 }
    );
  }
}
