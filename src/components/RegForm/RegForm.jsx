import { Formik, Field } from 'formik';
import * as Yup from 'yup';
import { StyledForm, Label, Button, ErrorMsg } from './RegForm.styled';
import { useDispatch } from 'react-redux';
import { Spinner } from 'components/Spinner';
import { useState } from 'react';
import { signUp } from 'redux/auth/operations';

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
  const [isLoad, setIsLoad] = useState(false);
  const dispatch = useDispatch();

  const onFormSubmit = credentials => {
    console.log(credentials);
    setIsLoad(true);
    dispatch(signUp(credentials)).finally(() => {
      setIsLoad(false);
    });
  };

  return (
    <Formik
      initialValues={{ name: '', email: '', password: '' }}
      validationSchema={SignupSchema}
      onSubmit={(values, actions) => {
        onFormSubmit(values);
        actions.resetForm();
      }}
    >
      <StyledForm>
        <Label>
          Name
          <Field name="name" type="text" placeholder="Jacob Mercer" />
          <ErrorMsg component="div" name="name" />
        </Label>
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
          Register {isLoad && <Spinner />}
        </Button>
      </StyledForm>
    </Formik>
  );
};
