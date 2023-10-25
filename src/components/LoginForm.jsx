import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { logIn } from 'redux/auth/operations';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  Toolbar,
} from '@mui/material';
import { TextField } from 'formik-mui';

export const SignupSchema = Yup.object().shape({
  email: Yup.string().required('Required'),
  password: Yup.string().required('Required'),
});

export const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const onFormSubmit = credentials => {
    setLoading(true);
    dispatch(logIn(credentials)).finally(() => {
      setLoading(false);
    });
  };

  return (
    <>
      <Toolbar />
      <Card elevation={3}>
        <Formik
          initialValues={{ email: '', password: '' }}
          onSubmit={(values, actions) => {
            onFormSubmit(values);
            actions.resetForm();
          }}
        >
          <Form>
            <CardContent
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                mb: 2,
                px: 5,
              }}
            >
              <Field
                component={TextField}
                name="email"
                type="email"
                label="Email"
                placeholder="jacob.mercer@mail.com"
                variant="standard"
              />
              <Field
                component={TextField}
                name="password"
                type="password"
                label="Password"
                placeholder="Your Password"
                variant="standard"
              />
            </CardContent>
            <CardActions
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                py: 2,
                px: 6,
              }}
            >
              <Button type="submit" variant="contained" disabled={loading}>
                Log In
                {loading && <CircularProgress size={24} />}
              </Button>
            </CardActions>
          </Form>
        </Formik>
      </Card>
    </>
  );
};
