'use client'

import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid, Legend } from "recharts"
type Props = {
    data: {month: string; income: number; expense: number}[]
}

function MonthlyBarChart (props: Props) {
    return (
        <div>
            <h1 className="py-3.5 text-2xl" > Monthly Chart </h1>
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
                    <Tooltip/>
                    <Legend/>
                    <Bar dataKey='income' fill='#34d399' name='Income'/>
                    <Bar dataKey='expense' fill='#f87171'name='Expense' />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}

export default MonthlyBarChart