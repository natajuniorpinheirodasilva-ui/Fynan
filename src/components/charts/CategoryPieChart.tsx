'use client'

import { PieChart, Pie, ResponsiveContainer, Sector, Tooltip } from "recharts"
import { PieSectorDataItem } from "recharts/types/polar/Pie"

type Props = {
  data: { category: string; total: number; type: "income" | "expense" }[]
}

const CategoryPieChart = (props: Props) => {

  const renderShape = (sectorProps: PieSectorDataItem & { payload?: { type: "income" | "expense" } }) => {
    const color = sectorProps.payload?.type === "income" ? "#34d399" : "#f87171"
    return <Sector {...sectorProps} fill={color} />
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
          />
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