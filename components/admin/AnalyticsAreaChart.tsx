"use client";

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

const chartData = [
  { month: "Jan", products: 2400, visitors: 2400 },
  { month: "Feb", products: 3398, visitors: 2210 },
  { month: "Mar", products: 2800, visitors: 2290 },
  { month: "Apr", products: 3908, visitors: 2000 },
  { month: "May", products: 4800, visitors: 2181 },
  { month: "Jun", products: 3800, visitors: 2500 },
  { month: "Jul", products: 4300, visitors: 2100 },
];

const chartConfig = {
  products: {
    label: "Products",
    color: "var(--chart-1)",
  },
  visitors: {
    label: "Visitors",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

export default function AnalyticsAreaChart() {
  return (
    <ChartContainer config={chartConfig} className="w-full h-full">
      <AreaChart
        accessibilityLayer
        data={chartData}
        margin={{
          left: -20,
          right: 8,
          top: 0,
          bottom: 0,
        }}
      >
        <defs>
          <linearGradient id="fillProducts" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stopColor="var(--color-products)"
              stopOpacity={0.8}
            />
            <stop
              offset="95%"
              stopColor="var(--color-products)"
              stopOpacity={0.1}
            />
          </linearGradient>
          <linearGradient id="fillVisitors" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stopColor="var(--color-visitors)"
              stopOpacity={0.8}
            />
            <stop
              offset="95%"
              stopColor="var(--color-visitors)"
              stopOpacity={0.1}
            />
          </linearGradient>
        </defs>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
        />
        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
        <Area
          dataKey="visitors"
          type="natural"
          fill="url(#fillVisitors)"
          fillOpacity={0.4}
          stroke="var(--color-visitors)"
          stackId="a"
        />
        <Area
          dataKey="products"
          type="natural"
          fill="url(#fillProducts)"
          fillOpacity={0.4}
          stroke="var(--color-products)"
          stackId="a"
        />
      </AreaChart>
    </ChartContainer>
  );
}
