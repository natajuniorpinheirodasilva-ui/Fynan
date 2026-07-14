'use client'

import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';

type Props = {
    data: { category: string; total: number }[]
}

const CategoryRadarChart = (props: Props) => {
return(
    <ResponsiveContainer
    width='100%' height={300}>
        <RadarChart data={props.data} >
            <PolarGrid/>
            <PolarAngleAxis dataKey='category' />
            <PolarRadiusAxis stroke="rgba(255,255,255,0.3)" tick={{ fill: 'rgba(255,255,255,0.5)' }} />
            <Radar dataKey='total' stroke="#22d3ee" fill="#22d3ee" fillOpacity={0.4} name="Total" />
            <Tooltip
                cursor={false}
                labelStyle={{ color: '#ffffff' }}
                contentStyle={{ backgroundColor: '#141925', border: '2px solid rgba(255, 255, 255, 1)', borderRadius: '8px' }}/>
        </RadarChart>
    </ResponsiveContainer>
)
}

export default CategoryRadarChart