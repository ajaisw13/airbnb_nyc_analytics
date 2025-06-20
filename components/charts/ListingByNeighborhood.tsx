import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer} from 'recharts';

type ListingByNeighborhoodProps = {
  properties: any[]
}


const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AA00FF', '#FF4444', '#00BFA5'];

export default function ListingByNeighborhood(props: ListingByNeighborhoodProps) {
  const {properties} = props

      // Group by neighbourhood and count
      const counts: Record<string, number> = {};
      properties.forEach((item) => {
        if (item.neighbourhood_group) {
          counts[item.neighbourhood_group] = (counts[item.neighbourhood_group] || 0) + 1;
        }
      });

      const chartReadyData = Object.entries(counts).map(([name, value]) => ({ name, value }));
      
  return (
    <>
      <h3>Listings by Neighbourhood Group</h3>
      <ResponsiveContainer width="100%" height={350}>
        <PieChart>
          <Pie
            data={chartReadyData}
            cx="50%"
            cy="50%"
            outerRadius={100}
            dataKey="value"
            labelLine={true}
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          >
            {chartReadyData.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </>
  );
}
