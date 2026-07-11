'use client'

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

type Props = {
  data: { month: string; income: number; expense: number }[]
}

function MonthlyLineChart(props: Props) {
  return (
    <div>
      <h1 className="py-3.5 text-2xl px-10 mx-10" >Monthly Line</h1>
      <ResponsiveContainer width='100%' height={300}>
        <LineChart
          data={props.data}
          margin={{ top: 5, right: 0, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
          <XAxis dataKey="month" stroke="rgba(255,255,255,0.5)" />
          <YAxis width="auto" stroke="rgba(255,255,255,0.5)" />
          <Tooltip
            cursor={{ stroke: 'rgba(255,255,255,0.2)' }}
            contentStyle={{ backgroundColor: '#141925', borderColor: 'rgba(255,255,255,0.1)' }}
            labelStyle={{ color: '#ffffff' }}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="income"
            stroke="#34d399"
            name="Income"
            dot={{ fill: '#141925' }}
            activeDot={{ r: 8, stroke: '#141925' }}
          />
          <Line
            type="monotone"
            dataKey="expense"
            stroke="#f87171"
            name="Expense"
            dot={{ fill: '#141925' }}
            activeDot={{ r: 8, stroke: '#141925' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default MonthlyLineChart