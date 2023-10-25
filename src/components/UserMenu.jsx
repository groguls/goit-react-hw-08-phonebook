import { Logout } from '@mui/icons-material';
import {
  Avatar,
  Box,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Tooltip,
} from '@mui/material';
import { stringAvatar } from 'components/Contact';
import { useAuth } from 'hooks/useAuth';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { logOut } from 'redux/auth/operations';
import stc from 'string-to-color';

export const UserMenu = () => {
  const [anchor, setAnchor] = useState(null);
  const { user } = useAuth();
  const dispatch = useDispatch();

  const handleOpenMenu = event => {
    setAnchor(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchor(null);
  };

  const avatarColor = stc(user.name);
  const avatarString = stringAvatar(user.name);

  return (
    <Box sx={{ mx: 2 }}>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenMenu} sx={{ p: 0 }}>
          <Avatar
            sx={{
              bgcolor: avatarColor,
              textTransform: 'uppercase',
            }}
          >
            {avatarString}
          </Avatar>
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: '45px' }}
        id="menu-appbar"
        anchorEl={anchor}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchor)}
        onClose={handleCloseMenu}
      >
        <MenuItem divider>
          <Avatar
            sx={{
              bgcolor: avatarColor,
              textTransform: 'uppercase',
            }}
          >
            {avatarString}{' '}
          </Avatar>
          <ListItemText sx={{ mx: 1 }}> {user.email}</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => dispatch(logOut())}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </Box>
  );
};
