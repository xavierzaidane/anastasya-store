import React from 'react';
import Link from 'next/link';
import StoreNavbar from '@/components/navigations/StoreNavbar';
import Footer from '@/components/navigations/Footer';
import { blogPosts } from '@/data/blog';

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

export default function BlogPage() {
	return (
		<section className="w-full min-h-screen ">
			<StoreNavbar />

			<div className="px-4 sm:px-6 lg:px-8 py-8 max-w-6xl mx-auto mt-20">
				{/* Header */}
				<div className="mb-10">
					<h1 className="text-3xl sm:text-4xl font-semibold font-mono text-zinc-900 tracking-tight mb-3">
						Blog
					</h1>
					<p className="text-zinc-600 text-base sm:text-lg">
						Tips, inspiration, and stories from the world of flowers
					</p>
				</div>

				{/* Blog Grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 min-h-[400px] items-stretch pb-16">
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
								<div className="rounded-xl overflow-hidden border border-zinc-200/80 bg-white h-full flex flex-col">
									{/* Image Placeholder */}
									<div className="aspect-video bg-pink-700 flex items-center justify-center relative overflow-hidden">
										{/* Decorative flower icon */}
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="48"
											height="48"
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											strokeWidth="1"
											strokeLinecap="round"
											strokeLinejoin="round"
											className="text-gray-300"
										>
											<path d="M12 7.5a4.5 4.5 0 1 1 4.5 4.5M12 7.5A4.5 4.5 0 1 0 7.5 12M12 7.5V9m-4.5 3a4.5 4.5 0 1 0 4.5 4.5M7.5 12H9m7.5 0a4.5 4.5 0 1 1-4.5 4.5m4.5-4.5H15m-3 4.5V15" />
											<circle cx="12" cy="12" r="3" />
										</svg>
									
									</div>

									{/* Content */}
									<div className="p-5 sm:p-6 flex flex-col flex-grow">
										{/* Category & Read Time */}
										<div className="flex items-center gap-3 mb-3">
											<span className="px-3 py-1 bg-pink-50 text-pink-700 text-xs font-medium rounded-full">
												{post.category}
											</span>
											<div className="flex items-center gap-1.5 text-xs text-zinc-500">
												<ClockIcon />
												<span>{post.readTime} min read</span>
											</div>
										</div>

										{/* Title */}
										<h2 className="text-lg sm:text-xl font-semibold text-zinc-900 mb-2 transition-colors duration-200 line-clamp-2 min-h-[3rem] sm:min-h-[3.5rem]">
											{post.title}
										</h2>

										{/* Excerpt */}
										<p className="text-zinc-600 text-sm leading-relaxed mb-4 line-clamp-3 flex-grow">
											{post.excerpt}
										</p>

										{/* Author & Date */}
										<div className="flex items-center justify-between pt-4 border-t border-zinc-100 mt-auto">
											<div className="flex items-center gap-2">
												<div className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center">
													<span className="text-xs font-medium text-pink-700">
														{post.author.initial}
													</span>
												</div>
												<div>
													<p className="text-xs font-medium text-zinc-900">
														{post.author.name}
													</p>
													<p className="text-xs text-zinc-500">
														{post.date}
													</p>
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
					))}
				</div>
			</div>

			<Footer />
		</section>
	);
}