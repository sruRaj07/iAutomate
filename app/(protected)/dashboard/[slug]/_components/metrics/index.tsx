'use client'
import { Card, CardContent } from '@/components/ui/card'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import React from 'react'
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
} from 'recharts'

type Props = {
  chartData: {
    month: string
    engagement: number
    posts: number
    replies: number
  }[]
}

const chartConfig = {
  engagement: {
    label: 'Engagement',
    color: 'hsl(var(--chart-1))',
  },
  replies: {
    label: 'Replies',
    color: 'hsl(var(--chart-2))',
  },
}

const Chart = ({ chartData }: Props) => {
  return (
    <Card className="border-none p-0">
      <CardContent className="p-0">
        <ResponsiveContainer
          height={300}
          width={'100%'}
        >
          <ChartContainer config={chartConfig}>
            <AreaChart
              accessibilityLayer
              data={chartData}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="line" />}
              />
              <Area
                dataKey="engagement"
                type="natural"
                fill="var(--color-engagement)"
                fillOpacity={0.4}
                stroke="var(--color-engagement)"
              />
              <Area
                dataKey="replies"
                type="natural"
                fill="var(--color-replies)"
                fillOpacity={0.18}
                stroke="var(--color-replies)"
              />
            </AreaChart>
          </ChartContainer>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

export default Chart
