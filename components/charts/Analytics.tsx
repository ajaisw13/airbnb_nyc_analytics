import { getDocs, collection } from "firebase/firestore";
import { useState, useEffect } from "react";
import { db } from "../../lib/firebase";
import AveragePriceByRoomTypeAndNeighborhood from "./AveragePriceByRoomTypeAndNeighborhood";
import PriceStaticsByNeighborhood from "./PriceStaticsByNeighborhood";
import RoomDistributionByNeighborhood from "./RoomDistributionByNeighborhood";
import { Grid, Paper } from "@mui/material";
import PriceDistributionHistogram from "./PriceDistributionHistogram";


export default function Analytics() {
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

  return (
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
  );
}