"use client";

import { products } from "@/data/products";
import { blogPosts } from "@/data/blog";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

const chartConfig = {
  products: {
    label: "Products",
    color: "hsl(var(--chart-1))",
  },
  posts: {
    label: "Blog Posts",
    color: "hsl(var(--chart-2))",
  },
};

export default function DashboardChart() {
  // Count products by category
  const productsByCategory = products.reduce(
    (acc, product) => {
      const existing = acc.find((item) => item.name === product.category);
      if (existing) {
        existing.products += 1;
      } else {
        acc.push({ name: product.category, products: 1 });
      }
      return acc;
    },
    [] as Array<{ name: string; products: number }>
  );

  // Count blog posts by category
  const postsByCategory = blogPosts.reduce(
    (acc, post) => {
      const category = post.category || "General";
      const existing = acc.find((item) => item.name === category);
      if (existing) {
        existing.posts += 1;
      } else {
        acc.push({ name: category, posts: 1 });
      }
      return acc;
    },
    [] as Array<{ name: string; posts: number }>
  );

  // Merge both datasets
  const data = productsByCategory.map((item, idx) => ({
    ...item,
    posts: postsByCategory[idx]?.posts || 0,
  }));

  return (
    <ChartContainer config={chartConfig} className="h-96 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 0, bottom: 20 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="var(--border)"
            opacity={0.5}
          />
          <XAxis
            dataKey="name"
            stroke="var(--foreground)"
            style={{ fontSize: "12px" }}
          />
          <YAxis stroke="var(--foreground)" style={{ fontSize: "12px" }} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Legend
            wrapperStyle={{ paddingTop: "20px" }}
          />
          <Bar
            dataKey="products"
            fill="var(--chart-1)"
            radius={[8, 8, 0, 0]}
            name="Products"
          />
          <Bar
            dataKey="posts"
            fill="var(--chart-2)"
            radius={[8, 8, 0, 0]}
            name="Blog Posts"
          />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
