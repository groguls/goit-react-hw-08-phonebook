import { Box, InputAdornment, TextField } from '@mui/material';
import PersonSearchTwoToneIcon from '@mui/icons-material/PersonSearchTwoTone';
import { useDispatch } from 'react-redux';
import { filterChange } from 'redux/contacts/contactsSlice';

export const Filter = () => {
  const dispatch = useDispatch();

  const handleFilterChange = evt => {
    dispatch(filterChange(evt.currentTarget.value));
  };

  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { p: 1, maxWidth: '100%' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        fullWidth
        margin="normal"
        id="standard-basic"
        label="Find contacts by name"
        variant="standard"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <PersonSearchTwoToneIcon />
            </InputAdornment>
          ),
        }}
        onChange={handleFilterChange}
      />
    </Box>
  );
};
