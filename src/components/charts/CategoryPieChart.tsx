'use client'

import { PieChart, Pie, ResponsiveContainer } from "recharts"

type Props = {
  data: { category: string, total: number }[]}

const CategoryPieChart = (props: Props ) => {
  return (
    <ResponsiveContainer width='100%' height={300}> 

    <PieChart>
      
      <Pie
      data={props.data}
      dataKey='total'
      nameKey='category'>
      </Pie>
  
    </PieChart>

    </ResponsiveContainer>

  )
}

export default CategoryPieChart