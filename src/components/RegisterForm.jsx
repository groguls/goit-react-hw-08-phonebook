import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { signUp } from 'redux/auth/operations';
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
  name: Yup.string()
    .min(2, 'Must be at least 2 characters long')
    .matches(
      /^[a-zA-Zа-яА-ЯіІєЄїЇю.]+(([' -][a-zA-Zа-яА-ЯіІєЄїЇ .])?[a-zA-Zа-яА-ЯіІєЄїЇ.]*)*$/,
      "Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
    )
    .required('Required'),
  email: Yup.string().email('Must be a valid email').required('Required'),
  password: Yup.string()
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
      'Password must include at least one letter, one digit, one special character (@, $, !, %, *, ?, or &), and be at least 6 characters in length.'
    )
    .required('Required'),
});

export const RegisterForm = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const onFormSubmit = credentials => {
    setLoading(true);
    dispatch(signUp(credentials)).finally(() => {
      setLoading(false);
    });
  };

  return (
    <>
      <Toolbar />
      <Card elevation={3}>
        <Formik
          initialValues={{ name: '', email: '', password: '' }}
          validationSchema={SignupSchema}
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
                name="name"
                type="text"
                label="Name"
                placeholder="Jacob Mercer"
                variant="standard"
              />
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
                Register
                {loading && <CircularProgress size={24} />}
              </Button>
            </CardActions>
          </Form>
        </Formik>
      </Card>
    </>
  );
};
