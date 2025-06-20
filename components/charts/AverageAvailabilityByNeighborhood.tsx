import { useState } from 'react';
import {
  Tooltip, ResponsiveContainer,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Line
} from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AA00FF', '#FF4444', '#00BFA5'];

type AverageAvailabilityByNeighborhoodProps = {
    properties: any[]
}

export default function AverageAvailabilityByNeighborhood (props: AverageAvailabilityByNeighborhoodProps) {
    const { properties} = props;


    const groupStats: Record<string, { total: number; count: number }> = {};

      properties.forEach(({ neighbourhood_group, availability_365 }) => {
        if (!groupStats[neighbourhood_group]) {
          groupStats[neighbourhood_group] = { total: 0, count: 0 };
        }
        groupStats[neighbourhood_group].total += availability_365;
        groupStats[neighbourhood_group].count += 1;
      });

      const trendReadyData = Object.entries(groupStats).map(([name, { total, count }]) => ({
        name,
        avgAvailability: +(total / count).toFixed(1),
      }));


  return (
    <>
      <h3>Average Availability by Neighbourhood Group</h3>
<ResponsiveContainer width="100%" height={300}>
  <LineChart data={trendReadyData}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="name" />
    <YAxis />
    <Tooltip />
    <Line type="monotone" dataKey="avgAvailability" stroke="#8884d8" />
  </LineChart>
</ResponsiveContainer>

    </>
  );
}
