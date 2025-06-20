import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Legend } from 'recharts';
import { db } from '../../lib/firebase';
import { AirbnbItem } from '../types';

type RoomDistributionByNeighborhoodProps = {
    properties: any[]
}

const RoomDistributionByNeighborhood = (props: RoomDistributionByNeighborhoodProps) => {
    const { properties } = props
    const groupedData: { [group: string]: { [room: string]: number } } = {};

    properties.forEach((item: AirbnbItem) => {
    const group = item.neighbourhood_group;
    const room = item.room_type;
    if (!group || !room) return;

    if (!groupedData[group]) {
      groupedData[group] = {};
    }

    groupedData[group][room] = (groupedData[group][room] || 0) + 1;
  });


    // Convert to array for Recharts
 // Step 2: Convert to array format for Recharts
      const finalChartData = Object.entries(groupedData).map(([group, rooms]) => ({
    neighbourhood_group: group,
  ...rooms // room types become dynamic keys
 }));


  return (
    <>
<h3>Room Type Distribution by Neighbourhood Group</h3>
<ResponsiveContainer width="100%" height={350}>
  <BarChart data={finalChartData}>
    <XAxis dataKey="neighbourhood_group" />
    <YAxis />
    <Tooltip />
    <CartesianGrid stroke="#ccc" />
    {/* Add a Bar for each room type you expect */}
    <Bar dataKey="Private room" stackId="a" fill="#8884d8" />
    <Bar dataKey="Entire home/apt" stackId="a" fill="#82ca9d" />
    <Bar dataKey="Shared room" stackId="a" fill="#ffc658" />
    {/* Add more Bars here if you have more room types */}
  </BarChart>
</ResponsiveContainer>


    </>
  );
};

export default RoomDistributionByNeighborhood;
