import { Box, SpeedDial, SpeedDialAction, SpeedDialIcon } from '@mui/material';
import {
  ManageAccountsTwoTone,
  PersonRemoveTwoTone,
} from '@mui/icons-material';
import { useState } from 'react';

export const ContactActions = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box sx={{ height: 80, transform: 'translateZ(0px)', flexGrow: 1 }}>
      <SpeedDial
        ariaLabel="Edit contact"
        sx={{ position: 'absolute', bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
      >
        <SpeedDialAction
          icon={<ManageAccountsTwoTone />}
          tooltipTitle={'Edit'}
          tooltipOpen
          onClick={handleClose}
        />
        <SpeedDialAction
          icon={<PersonRemoveTwoTone />}
          tooltipTitle={'Delete'}
          tooltipOpen
          onClick={handleClose}
        />
      </SpeedDial>
    </Box>
  );
};
