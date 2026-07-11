'use client'

import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid, Legend } from "recharts"
type Props = {
    data: {month: string; income: number; expense: number}[]
}

function MonthlyBarChart (props: Props) {
    return (
        <div>
            <h1 className="py-3.5 text-2xl px-10 mx-10" > Monthly Chart </h1>
            <ResponsiveContainer
                height={300}
                width='100%'>
                <BarChart
                    margin={{
                    top: 5,
                    right: 5,
                    left: 5,
                    bottom: 5,
                }}
                    data={props.data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey='month'/>
                    <YAxis width='auto'/>
                    <Tooltip
                    cursor={false}
                    labelStyle={{ color: '#ffffff' }}
                    contentStyle={{ backgroundColor: '#141925', border: '2px solid rgba(255, 255, 255, 1)', borderRadius: '8px' }}
                    />
                    <Legend/>
                    <Bar dataKey='income' fill='#34d399' name='Income'/>
                    <Bar dataKey='expense' fill='#f87171'name='Expense' />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}

export default MonthlyBarChart