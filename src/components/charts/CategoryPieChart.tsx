'use client'

import { PieChart, Pie, ResponsiveContainer, Sector, Tooltip } from "recharts"
import { PieSectorDataItem } from "recharts/types/polar/Pie"

type Props = {
  data: { category: string, total: number }[]}

const COLORS = ['#60a5fa', '#f87171', '#34d399', '#fbbf24', '#a78bfa', '#f472b6']

const CategoryPieChart = (props: Props ) => {
  
  const renderShape = (sectorProps: PieSectorDataItem & { index?: number }) => {
    const index = sectorProps.index ?? 0
    return <Sector {...sectorProps} fill={COLORS[index % COLORS.length]}/>
  }
  
  return (
    <div>
      <h1 className="py-3.5 text-2xl px-10 mx-10"> Category Chart </h1>
      <ResponsiveContainer width='100%' height={300}> 
        <PieChart>
          <Pie
            data={props.data}
            dataKey='total'
            nameKey='category'
            shape={renderShape}
            >
          </Pie>
          <Tooltip
            labelStyle={{ color: '#ffffff' }}
            contentStyle={{ backgroundColor: '#141925', border: '2px solid rgba(255, 255, 255, 1)', borderRadius: '8px' }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

export default CategoryPieChart