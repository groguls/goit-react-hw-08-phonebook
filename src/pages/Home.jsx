import { Card, CardContent, Toolbar, Typography } from '@mui/material';

export const Home = () => {
  return (
    <>
      <Toolbar />
      <Toolbar />
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
            Welcome to the Contacts app. <br />
            Please Log In or Register to take advantage of the full
            functionality.
            <br />
            If you are already logged in, you can go to the Contacts page
          </Typography>
        </CardContent>
      </Card>
    </>
  );
};
