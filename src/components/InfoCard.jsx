import { Card, CardContent, Typography } from '@mui/material';

export const InfoCard = () => {
  return (
    <Card elevation={3}>
      <CardContent
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 2,
          mb: 2,
          p: 5,
        }}
      >
        <Typography variant="h6" display="block">
          👈 Please select a contact from the list on the left to see the
          details.
        </Typography>
      </CardContent>
    </Card>
  );
};
