import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import StoreNavbar from '@/components/navigations/StoreNavbar';
import Footer from '@/components/navigations/Footer';
import { getBlogPostBySlug, getRelatedPosts, BlogPost } from '@/data/blog';

// Clock icon component
function ClockIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </svg>
  );
}

// Arrow left icon
function ArrowLeftIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 6C15 6 9.00001 10.4189 9 12C8.99999 13.5812 15 18 15 18" />
    </svg>
  );
}

// Blog card component for related posts
function BlogCard({ post }: { post: BlogPost }) {
  return (
    <article className="group cursor-pointer focus-visible:outline-none h-full flex flex-col">
      <Link
        href={`/blog/${post.slug}`}
        className="w-full h-full text-left focus-visible:outline-none"
        aria-label={`Read ${post.title}`}
      >
        <div className="rounded-xl overflow-hidden border bg-white border-zinc-200/80   transition-shadow duration-300 h-full flex flex-col">
          {/* Image Placeholder */}
          <div className="aspect-video bg-linear-to-br from-pink-50 to-pink-100 flex items-center justify-center relative overflow-hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-pink-300"
            >
              <path d="M12 7.5a4.5 4.5 0 1 1 4.5 4.5M12 7.5A4.5 4.5 0 1 0 7.5 12M12 7.5V9m-4.5 3a4.5 4.5 0 1 0 4.5 4.5M7.5 12H9m7.5 0a4.5 4.5 0 1 1-4.5 4.5m4.5-4.5H15m-3 4.5V15" />
              <circle cx="12" cy="12" r="3" />
            </svg>
       
          </div>

          {/* Content */}
          <div className="p-5 sm:p-6 flex flex-col grow">
            {/* Category & Read Time */}
            <div className="flex items-center gap-3 mb-3">
              <span className="px-3 py-1  text-pink-700 text-xs font-medium rounded-full">
                {post.category}
              </span>
              <div className="flex items-center gap-1.5 text-xs text-zinc-500">
                <ClockIcon size={14} />
                <span>{post.readTime} min read</span>
              </div>
            </div>

            {/* Title */}
            <h3 className="text-lg sm:text-xl font-semibold text-zinc-900 mb-2 group-hover:text-pink-600 transition-colors duration-200 line-clamp-2 min-h-12 sm:min-h-14">
              {post.title}
            </h3>

   
            {/* Author & Date */}
            <div className="flex items-center justify-between pt-4 border-t border-zinc-100 mt-auto">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full flex items-center justify-center">
                  <span className="text-xs font-medium text-pink-700">
                    {post.author.initial}
                  </span>
                </div>
                <div>
                  <p className="text-xs font-medium text-zinc-900">
                    {post.author.name}
                  </p>
                  <p className="text-xs text-zinc-500">{post.date}</p>
                </div>
              </div>
              <span className="text-xs font-medium text-pink-600 group-hover:text-pink-700 transition-colors duration-200">
                Read →
              </span>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}

// Markdown-style content renderer
function BlogContent({ content }: { content: string }) {
  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];

  lines.forEach((line, index) => {
    const trimmedLine = line.trim();

    if (trimmedLine === '') {
      // Skip empty lines but add spacing
      return;
    }

    // H2 headers
    if (trimmedLine.startsWith('## ')) {
      elements.push(
        <h2
          key={index}
          className="text-2xl font-bold text-zinc-900 mt-8 mb-4 first:mt-0"
        >
          {trimmedLine.slice(3)}
        </h2>
      );
      return;
    }

    // Bold text handling within paragraphs
    const formattedLine = trimmedLine.replace(
      /\*\*(.*?)\*\*/g,
      '<strong>$1</strong>'
    );

    // List items
    if (trimmedLine.startsWith('- ')) {
      elements.push(
        <li
          key={index}
          className="text-zinc-700 leading-relaxed ml-4"
          dangerouslySetInnerHTML={{ __html: formattedLine.slice(2) }}
        />
      );
      return;
    }

    // Numbered list items
    const numberedMatch = trimmedLine.match(/^(\d+)\.\s+(.+)/);
    if (numberedMatch) {
      elements.push(
        <li
          key={index}
          className="text-zinc-700 leading-relaxed ml-4 list-decimal"
          dangerouslySetInnerHTML={{ __html: numberedMatch[2].replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }}
        />
      );
      return;
    }

    // Regular paragraphs
    elements.push(
      <p
        key={index}
        className="text-base text-zinc-700 leading-relaxed mb-4"
        dangerouslySetInnerHTML={{ __html: formattedLine }}
      />
    );
  });

  return <div className="space-y-1">{elements}</div>;
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedPosts(slug, 3);

  return (
    <section className="w-full min-h-screen">
      <StoreNavbar />

      <div className="px-8 sm:px-6 lg:px-8 py-8 max-w-6xl mx-auto mt-20">
        {/* Back Button */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-zinc-600 hover:text-zinc-900 mb-6 transition-colors group"
          aria-label="Back to blog"
        >
          <ArrowLeftIcon />
          <span className="font-medium">Back to Blog</span>
        </Link>

        {/* Article */}
        <article className="bg-white rounded-xl border border-zinc-200/80 overflow-hidden">
          {/* Header Image Placeholder */}
          <div className="aspect-video bg-linear-to-br from-pink-50 to-pink-100 flex items-center justify-center relative overflow-hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="64"
              height="64"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-pink-300"
            >
              <path d="M12 7.5a4.5 4.5 0 1 1 4.5 4.5M12 7.5A4.5 4.5 0 1 0 7.5 12M12 7.5V9m-4.5 3a4.5 4.5 0 1 0 4.5 4.5M7.5 12H9m7.5 0a4.5 4.5 0 1 1-4.5 4.5m4.5-4.5H15m-3 4.5V15" />
              <circle cx="12" cy="12" r="3" />
            </svg>
            <span className="absolute top-4 left-4 text-6xl font-bold text-pink-200/60">
              {post.title.charAt(0)}
            </span>
          </div>

          {/* Content */}
          <div className="p-6 sm:p-8 md:p-12">
            {/* Category & Read Time */}
            <div className="flex items-center gap-3 mb-6">
              <span className="px-3 py-1 bg-pink-50 text-pink-700 text-sm font-medium rounded-full">
                {post.category}
              </span>
              <div className="flex items-center gap-1.5 text-sm text-zinc-500">
                <ClockIcon />
                <span>{post.readTime} min read</span>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-zinc-900 mb-4 leading-tight">
              {post.title}
            </h1>

            {/* Author Info */}
            <div className="flex items-center gap-3 mb-8 pb-8 border-b border-zinc-200">
              <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center">
                <span className="text-sm font-medium text-pink-700">
                  {post.author.initial}
                </span>
              </div>
              <div>
                <p className="text-sm font-medium text-zinc-900">
                  {post.author.name}
                </p>
                <p className="text-sm text-zinc-500">{post.date}</p>
              </div>
            </div>

            {/* Article Content */}
            <div className="prose prose-zinc max-w-none">
              <BlogContent content={post.content} />
            </div>
          </div>
        </article>

        {/* Related Articles */}
        {relatedPosts.length > 0 && (
          <div className="mt-16 pb-16">
            <h2 className="text-2xl font-bold text-zinc-900 mb-8">
              Suggested Articles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {relatedPosts.map((relatedPost) => (
                <BlogCard key={relatedPost.id} post={relatedPost} />
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </section>
  );
}