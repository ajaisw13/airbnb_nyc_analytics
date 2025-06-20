import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import {
  Box, Typography, Paper,
  Table, TableHead, TableRow, TableCell, TableBody
} from '@mui/material';
import { useEffect, useState } from 'react';
import { db } from '../lib/firebase';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import {tableCellHeaderStyle, tableCellStyle} from '../styles/styles';

const HouseList = () => {
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

        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Airbnb House List
          </Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={tableCellHeaderStyle}>Name</TableCell>
                <TableCell sx={tableCellHeaderStyle}>Host Name</TableCell>
                <TableCell sx={tableCellHeaderStyle}>Number of Reviews</TableCell>
                <TableCell sx={tableCellHeaderStyle}>Neighborhood Group</TableCell>
                <TableCell sx={tableCellHeaderStyle}>Neighborhood</TableCell>
                <TableCell sx={tableCellHeaderStyle}>Room Type</TableCell>
                <TableCell sx={tableCellHeaderStyle}>Reviews per month</TableCell>
                <TableCell sx={tableCellHeaderStyle}>Price</TableCell>
                <TableCell sx={tableCellHeaderStyle}>Minimum Nights</TableCell>
                <TableCell sx={tableCellHeaderStyle}>Last Review</TableCell>
                <TableCell sx={tableCellHeaderStyle}>Calculated Host Listing Count</TableCell>
                <TableCell sx={tableCellHeaderStyle}>Availability 365</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {properties.map(property => (
                <TableRow key={property.id}>
                  <TableCell sx={tableCellStyle}>{property.name}</TableCell>
                  <TableCell sx={tableCellStyle}>{property.host_name}</TableCell>
                  <TableCell sx={tableCellStyle}>{property.number_of_reviews}</TableCell>
                  <TableCell sx={tableCellStyle}>{property.neighbourhood_group}</TableCell>
                  <TableCell sx={tableCellStyle}>{property.neighbourhood}</TableCell>
                  <TableCell sx={tableCellStyle}>{property.room_type}</TableCell>
                  <TableCell sx={tableCellStyle}>{property.reviews_per_month}</TableCell>
                  <TableCell sx={tableCellStyle}>{property.price}</TableCell>
                  <TableCell sx={tableCellStyle}>{property.minimum_nights}</TableCell>
                  <TableCell sx={tableCellStyle}>{property.last_review}</TableCell>
                  <TableCell sx={tableCellStyle}>{property.calculated_host_listings_count}</TableCell>
                  <TableCell sx={tableCellStyle}>{property.availability_365}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </Box>
    </Box>
  );
};

export default HouseList;
