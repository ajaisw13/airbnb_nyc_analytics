import Link from 'next/link';
import { useRouter } from 'next/router';
import { List, ListItemButton, ListItemText } from '@mui/material';

const Sidebar = () => {
  const router = useRouter();

  const navItems = [
    { text: 'Dashboard', path: '/' },
    { text: 'Reports', path: '/reports' },
    { text: 'Airbnb NYC House List', path: '/houselist' },
  ];

  return (
    <List>
      {navItems.map((item) => (
        <ListItemButton
          key={item.text}
          component={Link}
          href={item.path}
          selected={router.pathname === item.path}
          sx={{
            backgroundColor: router.pathname === item.path ? '#e3f2fd' : 'inherit',
            '&:hover': { backgroundColor: '#f5f5f5' },
            color: 'primary.main',
          }}
        >
          <ListItemText
            primary={item.text}
            primaryTypographyProps={{
              fontWeight: router.pathname === item.path ? 'bold' : 'normal',
            }}
          />
        </ListItemButton>
      ))}
    </List>
  );
};

export default Sidebar;
