import { Box, Grid, Paper, CircularProgress, Alert } from "@mui/material"
import Header from "../components/Header"
import Sidebar from "../components/Sidebar"
import PriceDistributionHistogram from "../components/charts/PriceDistributionHistogram";
import { useEffect, useState } from "react";
import AveragePriceByRoomTypeAndNeighborhood from "../components/charts/AveragePriceByRoomTypeAndNeighborhood";
import PriceStaticsByNeighborhood from "../components/charts/PriceStaticsByNeighborhood";
import RoomDistributionByNeighborhood from "../components/charts/RoomDistributionByNeighborhood";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../lib/firebase";
import { AirbnbItem } from "../components/types";

export default function Dashboard() {
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
        {loading && <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}><CircularProgress /></Box>}
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {!loading && !error && (
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Paper elevation={3} sx={{ p: 2 }}>
                <AveragePriceByRoomTypeAndNeighborhood properties={properties} />
                <PriceStaticsByNeighborhood properties={properties} />
                <RoomDistributionByNeighborhood properties={properties} />
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper elevation={3} sx={{ p: 2 }}>
                <PriceDistributionHistogram properties={properties} />
              </Paper>
            </Grid>
          </Grid>
        )}
      </Box>
    </Box>
  );
}

