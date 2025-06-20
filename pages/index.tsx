import { Box, Grid, Paper } from "@mui/material"
import Header from "../components/Header"
import Sidebar from "../components/Sidebar"
import PriceDistributionHistogram from "../components/charts/PriceDistributionHistogram";
import { useEffect, useState } from "react";
import AveragePriceByRoomTypeAndNeighborhood from "../components/charts/AveragePriceByRoomTypeAndNeighborhood";
import PriceStaticsByNeighborhood from "../components/charts/PriceStaticsByNeighborhood";
import RoomDistributionByNeighborhood from "../components/charts/RoomDistributionByNeighborhood";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../lib/firebase";

export default function Dashboard () {
  const [properties, setProperties] = useState<any[]>([]);

  const fetchProperties = async () => {

    const snapshot = await getDocs(collection(db, 'properties'));

    const properties = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    setProperties(properties)

}
  useEffect(() => {
    fetchProperties()
 })

    return <>

    <Box sx={{ display: 'flex' }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1, p: 3 }}>
        <Header />
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 2 }}>
            <AveragePriceByRoomTypeAndNeighborhood properties={properties} />
            <PriceStaticsByNeighborhood  properties={properties}/>
            <RoomDistributionByNeighborhood  properties={properties}/>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 2 }}>
              <PriceDistributionHistogram properties={properties} /> 
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
    </>
}

