import { Formik, Field } from 'formik';
import * as Yup from 'yup';
import { StyledForm, Label, Button, ErrorMsg } from './LoginForm.styled';
import { useDispatch } from 'react-redux';
import { Spinner } from 'components/Spinner';
import { useState } from 'react';
import { logIn, logOut } from 'redux/auth/operations';

export const SignupSchema = Yup.object().shape({
  email: Yup.string().required('Required'),
  password: Yup.string().required('Required'),
});

export const LoginForm = () => {
  const [isLoad, setIsLoad] = useState(false);
  const dispatch = useDispatch();

  const onFormSubmit = credentials => {
    setIsLoad(true);
    dispatch(logIn(credentials)).finally(() => {
      setIsLoad(false);
    });
  };

  const onLogOut = () => {
    dispatch(logOut());
  };

  return (
    <>
      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={(values, actions) => {
          onFormSubmit(values);
          actions.resetForm();
        }}
      >
        <StyledForm>
          <Label>
            Email
            <Field
              name="email"
              type="email"
              placeholder="jacob.mercer@mail.com"
            />
            <ErrorMsg component="div" name="email" />
          </Label>
          <Label>
            Password
            <Field name="password" type="password" placeholder="password" />
            <ErrorMsg component="div" name="password" />
          </Label>

          <Button type="submit" disabled={isLoad}>
            LogIn {isLoad && <Spinner />}
          </Button>
        </StyledForm>
      </Formik>
      <Button type="button" onClick={onLogOut}>
        LogOut
      </Button>
    </>
  );
};
