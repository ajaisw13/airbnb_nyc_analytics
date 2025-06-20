import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import { AirbnbItem } from '../types';

type PriceDistributionHistogramProps = {
    properties: any[]
  }

const PriceDistributionHistogram = (props: PriceDistributionHistogramProps) => {
  const { properties } = props

    const bins = [0, 50, 100, 150, 200, 300, 500, 1000];
    const binCounts: { [key: string]: number } = {};
    
    bins.forEach((_, i) => {
      if (i === bins.length - 1) return;
      const label = `${bins[i]}–${bins[i + 1]}`;
      binCounts[label] = 0;
    });
    
    properties.forEach((item: AirbnbItem) => {
      const price = Number(item.price);
      if (isNaN(price)) return;
    
      for (let i = 0; i < bins.length - 1; i++) {
        if (price >= bins[i] && price < bins[i + 1]) {
          const label = `${bins[i]}–${bins[i + 1]}`;
          binCounts[label] += 1;
          break;
        }
      }
    });
    const priceHistogramData = Object.entries(binCounts).map(([range, count]) => ({
      range,
      count
    }));
 

  return (
    <>
<h3>Price Distribution Histogram</h3>
<ResponsiveContainer width="100%" height={300}>
  <BarChart data={priceHistogramData}>
    <XAxis dataKey="range" />
    <YAxis />
    <Tooltip />
    <CartesianGrid stroke="#ccc" />
    <Bar dataKey="count" fill="#8884d8" />
  </BarChart>
</ResponsiveContainer>

    </>
  );
};

export default PriceDistributionHistogram;
