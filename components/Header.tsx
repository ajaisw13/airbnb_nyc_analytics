import { AppBar, Toolbar, Typography } from '@mui/material';

export default function Header() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div">
          Airbnb NYC Housing Analytics
        </Typography>
      </Toolbar>
    </AppBar>
  );
}