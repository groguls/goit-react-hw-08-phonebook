import { Box, Button, Drawer } from '@mui/material';
import PersonAddAlt1TwoToneIcon from '@mui/icons-material/PersonAddAlt1TwoTone';
import { ContactList } from 'components/ContactList';
import { Filter } from 'components/Filter';
import { Suspense, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchContacts } from 'redux/contacts/operations';
import { Link, Outlet } from 'react-router-dom';

export const Contacts = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const drawerWidth = 250;
  return (
    <Box sx={{ display: 'flex' }}>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,

          [`& .MuiDrawer-paper`]: {
            position: 'absolute',
            width: drawerWidth,
            height: 'inherit',
            boxSizing: 'border-box',
          },
        }}
      >
        <Box
          sx={{ overflow: 'auto', display: 'flex', flexDirection: 'column' }}
        >
          <Box sx={{ p: 1 }}>
            <Filter />
            <ContactList />
          </Box>
          <Button
            component={Link}
            to="add"
            fullWidth
            variant="contained"
            endIcon={<PersonAddAlt1TwoToneIcon />}
          >
            Add Contact
          </Button>
        </Box>
      </Drawer>
      <Box sx={{ flexGrow: 1, p: 3 }}>
        <Suspense>
          <Outlet />
        </Suspense>
      </Box>
    </Box>
  );
};
