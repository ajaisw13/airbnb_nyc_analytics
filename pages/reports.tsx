import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { Box, Typography, Paper, CircularProgress, Alert } from '@mui/material';
import ListingByNeighborhood from '../components/charts/ListingByNeighborhood';
import AverageAvailabilityByNeighborhood from '../components/charts/AverageAvailabilityByNeighborhood';
import { useEffect, useState } from 'react';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { AirbnbItem } from '../components/types';

export default function Reports() {
  const [properties, setProperties] = useState<AirbnbItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'properties'));
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as AirbnbItem[];
        setProperties(data);
      } catch (err) {
        setError('Failed to load property data. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, []);
  
  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1, p: 3 }}>
        <Header />
        <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
          <Typography variant="h5">Reports</Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
            Analytics and summaries of NYC Airbnb listings by neighbourhood group, room type, and availability.
          </Typography>
        </Paper>
        {loading && <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}><CircularProgress /></Box>}
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {!loading && !error && (
          <Paper elevation={3} sx={{ p: 3 }}>
            <ListingByNeighborhood properties={properties} />
            <AverageAvailabilityByNeighborhood properties={properties} />
          </Paper>
        )}
      </Box>
    </Box>
  );
}