import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import { db } from '../../lib/firebase';
import { AirbnbItem } from '../types';


type PriceStaticsByNeighborhoodProps = {
    properties: any[]
  }

const PriceStaticsByNeighborhood = (props: PriceStaticsByNeighborhoodProps) => {
    const {properties} = props


  const priceStatsMap: {
    [group: string]: { sum: number; count: number; min: number; max: number };
  } = {};
  
  properties.forEach((item: AirbnbItem) => {
    const group = item.neighbourhood_group;
    const price = Number(item.price);
  
    if (!group || isNaN(price)) return;
  
    if (!priceStatsMap[group]) {
      priceStatsMap[group] = { sum: 0, count: 0, min: price, max: price };
    }
  
    priceStatsMap[group].sum += price;
    priceStatsMap[group].count += 1;
    priceStatsMap[group].min = Math.min(priceStatsMap[group].min, price);
    priceStatsMap[group].max = Math.max(priceStatsMap[group].max, price);
  });
  const priceStatsData = Object.entries(priceStatsMap).map(([group, stats]) => ({
    neighbourhood_group: group,
    avg_price: Math.round(stats.sum / stats.count),
    min_price: stats.min,
    max_price: stats.max
  }));
 

  return (
    <>
    <h3>Price Statistics by Neighbourhood Group</h3>
<ResponsiveContainer width="100%" height={350}>
  <BarChart data={priceStatsData} layout='vertical' margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
    <XAxis type="number"/>
    <YAxis dataKey="neighbourhood_group" type="category" />
    <Tooltip />
    <CartesianGrid stroke="#ccc" />
    <Bar dataKey="avg_price" fill="#8884d8" name="Average Price" />
    <Bar dataKey="min_price" fill="#82ca9d" name="Min Price" />
    {/* <Bar dataKey="max_price" fill="#ffc658" name="Max Price" /> */}
  </BarChart>
</ResponsiveContainer>
    </>
  );
};

export default PriceStaticsByNeighborhood;
