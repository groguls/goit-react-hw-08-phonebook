import { Box, Button } from '@mui/material';
import { NavLink } from 'react-router-dom';

export const AuthMenu = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <Button
        component={NavLink}
        to="register"
        sx={{
          my: 2,
          color: 'white',
          display: 'block',
          [`&.active`]: {
            outline: 'solid',
          },
        }}
      >
        Register
      </Button>
      <Button
        component={NavLink}
        to="login"
        sx={{
          my: 2,
          color: 'white',
          display: 'block',
          [`&.active`]: {
            outline: 'solid',
          },
        }}
      >
        Log In
      </Button>
    </Box>
  );
};
