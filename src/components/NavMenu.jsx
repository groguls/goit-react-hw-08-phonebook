import { Box, Button } from '@mui/material';
import { NavLink } from 'react-router-dom';

export const NavMenu = () => {
  return (
    <Box sx={{ mx: 2 }}>
      <Button
        component={NavLink}
        to="contacts"
        onClick={null}
        sx={{
          my: 1,
          color: 'white',
          display: 'block',
          [`&.active`]: {
            outline: 'solid',
          },
        }}
      >
        Contacts
      </Button>
    </Box>
  );
};
