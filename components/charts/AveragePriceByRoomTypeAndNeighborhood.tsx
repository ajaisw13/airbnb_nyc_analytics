import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Legend } from 'recharts';
import { AirbnbItem } from '../types';

type AveragePriceByRoomTypeAndNeighborhoodProps = {
    properties: any[]
}


const AveragePriceByRoomTypeAndNeighborhood = (props: AveragePriceByRoomTypeAndNeighborhoodProps) => {
    const { properties } = props
    const grouped: {
      [group: string]: {
        [room: string]: { sum: number; count: number };
      };
    } = {};
    
    properties.forEach((item: AirbnbItem) => {
      const group = item.neighbourhood_group;
      const room = item.room_type;
      const price = Number(item.price);
      if (!group || !room || isNaN(price)) return;
    
      if (!grouped[group]) grouped[group] = {};
      if (!grouped[group][room]) grouped[group][room] = { sum: 0, count: 0 };
    
      grouped[group][room].sum += price;
      grouped[group][room].count += 1;
    });
    
    const groupedPriceData = Object.entries(grouped).map(([group, rooms]) => {
      const entry: any = { neighbourhood_group: group };
      Object.entries(rooms).forEach(([room, { sum, count }]) => {
        entry[room] = +(sum / count).toFixed(2); // rounded avg
      });
      return entry;
    });

    


  return (
    <>
    <h3>Average Price by Room Type and Neighborhood Group</h3>
<ResponsiveContainer width="100%" height={350}>
  <BarChart data={groupedPriceData} >
    <XAxis dataKey="neighbourhood_group" />
    <YAxis />
    <Tooltip />
    <CartesianGrid stroke="#ccc" />
    <Bar dataKey="Entire home/apt" fill="#82ca9d" />
    <Bar dataKey="Private room" fill="#8884d8" />
    <Bar dataKey="Shared room" fill="#ffc658" />
    {/* Add more bars if needed */}
    <Legend />
  </BarChart>
</ResponsiveContainer>
    </>
  );
};

export default AveragePriceByRoomTypeAndNeighborhood;
