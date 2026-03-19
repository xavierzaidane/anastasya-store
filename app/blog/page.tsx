import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import StoreNavbar from '@/components/navigations/StoreNavbar';
import Footer from '@/components/navigations/Footer';
import { getPublishedBlogs } from '@/lib/server/blogs';

// Clock icon component
function ClockIcon() {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="14"
			height="14"
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

export default async function BlogPage() {
	const blogPosts = await getPublishedBlogs();
	return (
		<section className="w-full min-h-screen ">
			<StoreNavbar />

		<div className="px-4 sm:px-6 lg:px-8 py-8 max-w-6xl mx-auto mt-1">
				{/* Header */}
				<div className="mb-10">
					<h1 className="text-3xl sm:text-4xl font-semibold font-mono text-foreground tracking-tight mb-3">
						Blog
					</h1>
					<p className="text-muted-foreground text-base sm:text-lg">
						Tips, inspiration, and stories from the world of flowers
					</p>
				</div>

				{/* Blog Grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 min-h-100 items-stretch pb-16">
					{blogPosts.length === 0 && (
						<p className="text-sm text-muted-foreground col-span-full font-mono">No blog posts available.</p>
					)}

					{blogPosts.map((post) => (
						<article
							key={post.id}
							className="group cursor-pointer focus-visible:outline-none h-full flex flex-col"
						>
							<Link
								href={`/blog/${post.slug}`}
								className="w-full h-full text-left focus-visible:outline-none"
								aria-label={`Read ${post.title}`}
							>
								<div className="rounded-xl overflow-hidden border border-border/80 bg-card h-full flex flex-col transition-all duration-300 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5">
									{/* Image */}
									<div className="aspect-video bg-muted flex items-center justify-center relative overflow-hidden">
										<Image
											src={post.image}
											alt={post.title}
											fill
											className="object-cover transition-transform duration-500 group-hover:scale-105"
										/>
									</div>

									{/* Content */}
									<div className="p-5 sm:p-6 flex flex-col grow">
										{/* Category & Read Time */}
										<div className="flex items-center gap-3 mb-3">
											<span className="px-3 py-1 bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider rounded-full font-mono">
												{post.category}
											</span>
											<div className="flex items-center gap-1.5 text-xs text-muted-foreground font-mono">
												<ClockIcon />
												<span>{post.readTime} min read</span>
											</div>
										</div>

										{/* Title */}
										<h2 className="text-lg sm:text-xl font-semibold text-foreground mb-2 transition-colors duration-200 line-clamp-2 min-h-12 sm:min-h-14 font-serif">
											{post.title}
										</h2>

										{/* Excerpt */}
										<p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-3 grow">
											{post.excerpt}
										</p>

										{/* Author & Date */}
										<div className="flex items-center justify-between pt-4 border-t border-border/40 mt-auto">
											<div className="flex items-center gap-2">
												<div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
													<span className="text-[10px] font-bold text-primary">
														{post.author.initial}
													</span>
												</div>
												<div>
													<p className="text-[10px] font-bold text-foreground uppercase tracking-tight">
														{post.author.name}
													</p>
													<p className="text-[10px] text-muted-foreground uppercase">
														{post.date}
													</p>
												</div>
											</div>
											<span className="text-xs font-bold text-primary group-hover:translate-x-1 transition-transform duration-300 font-mono">
												READ →
											</span>
										</div>
									</div>
								</div>
							</Link>
						</article>
					))}
				</div>
			</div>

			<Footer />
		</section>
	);
}