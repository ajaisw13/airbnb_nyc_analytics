import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { Box, Typography, Paper } from '@mui/material';
import  ListingByNeighborhood  from '../components/charts/ListingByNeighborhood';
import AverageAvailabilityByNeighborhood from '../components/charts/AverageAvailabilityByNeighborhood';
import { useEffect, useState } from 'react';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '../lib/firebase';

export default function Reports() {
  const [properties, setProperties] = useState<any[]>([]);

  // Fetch users from Firestore
  const fetchProperties = async () => {
    const snapshot = await getDocs(collection(db, 'properties'));
    const userData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setProperties(userData);
  };

  useEffect(() => {
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
            This section includes analytics and summaries such as Listing by Neighbourhood Group etc.
          </Typography>
        </Paper>
        <Paper elevation={3} sx={{ p: 3 }}>
          <ListingByNeighborhood  properties={properties}/>
          <AverageAvailabilityByNeighborhood properties={properties}/>
        </Paper>
      </Box>
    </Box>
  );
}