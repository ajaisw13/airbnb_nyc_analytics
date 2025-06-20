import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { List, ListItem, ListItemText } from '@mui/material';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '../lib/firebase';

const Sidebar = () => {
  const router = useRouter();
  const [currentPath, setCurrentPath] = useState<string | null>(null);

  useEffect(() => {

    setCurrentPath(router.pathname);
  }, [router.pathname]);

  const navItems = [
    { text: 'Dashboard', path: '/' },
    { text: 'Reports', path: '/reports' },
    { text: 'Airbnb NYC House List', path: '/houselist' },
  ];

  return (
    <List>
      {navItems.map((item) => (
        <Link href={item.path} passHref key={item.text}  style={{textDecoration: 'none'}}>
          <ListItem
            button
            component="a"
            selected={currentPath === item.path}
            sx={{
              backgroundColor: currentPath === item.path ? '#e3f2fd' : 'inherit',
              '&:hover': { backgroundColor: '#f5f5f5' },
              color: 'primary.main',
              
            }}
          >
            <ListItemText
              primary={item.text}
              primaryTypographyProps={{
                fontWeight: currentPath === item.path ? 'bold' : 'normal',
              }}
            />
          </ListItem>
        </Link>
      ))}
    </List>
  );
};

export default Sidebar;
