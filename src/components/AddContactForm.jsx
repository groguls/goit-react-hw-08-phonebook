import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { selectContacts } from 'redux/contacts/contactsSlice';
import { addContact } from 'redux/contacts/operations';
import { useState } from 'react';
import { TextField } from 'formik-mui';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too Short!')
    .matches(
      /^[a-zA-Zа-яА-ЯіІєЄїЇю.]+(([' -][a-zA-Zа-яА-ЯіІєЄїЇ .])?[a-zA-Zа-яА-ЯіІєЄїЇ.]*)*$/,
      "Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
    )
    .required('Required'),
  number: Yup.string()
    .matches(
      /\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}/,
      'Phone number must be digits and can contain spaces, dashes, parentheses and can start with +'
    )
    .required('Required'),
});

export const AddContactForm = () => {
  const [loading, setLoading] = useState(false);
  const contacts = useSelector(selectContacts);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validateName = name => {
    const isNameInContacts = contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );
    if (isNameInContacts) {
      return `${name} is alredy in contacts`;
    }
  };

  const onFormSubmit = async contactData => {
    setLoading(true);
    const { payload } = await dispatch(addContact(contactData)).finally(() => {
      setLoading(false);
    });
    navigate(`/contacts/${payload.id}`);
  };

  return (
    <Card elevation={3}>
      <Formik
        initialValues={{ name: '', number: '' }}
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
              validate={validateName}
            />
            <Field
              component={TextField}
              name="number"
              type="tel"
              label="Phone number"
              placeholder="067 123 45 67"
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
              Add Contact
              {loading && <CircularProgress size={24} />}
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                navigate(`/contacts`);
              }}
            >
              Cancel
            </Button>
          </CardActions>
        </Form>
      </Formik>
    </Card>
  );
};
