import { Link } from 'react-router-dom';
import { NavMenu } from 'components/NavMenu';
import { AuthMenu } from 'components/AuthMenu';
import { UserMenu } from 'components/UserMenu';
import { AppBar, Box, Container, Toolbar, Typography } from '@mui/material';
import ContactPhoneTwoToneIcon from '@mui/icons-material/ContactPhoneTwoTone';
import { useAuth } from 'hooks/useAuth';

export const ApplicationBar = () => {
  const { isLoggedIn } = useAuth();
  return (
    <AppBar position="fixed" sx={{ zIndex: theme => theme.zIndex.drawer + 1 }}>
      <Container maxWidth="md">
        <Toolbar disableGutters>
          <ContactPhoneTwoToneIcon sx={{ mr: 2 }} />
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'none', sm: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.15rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            myContactsApp
          </Typography>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              flexGrow: 1,
              alignItems: 'center',
            }}
          >
            {isLoggedIn ? (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <NavMenu />
                <UserMenu />
              </Box>
            ) : (
              <AuthMenu />
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
