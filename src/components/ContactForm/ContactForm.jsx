import { Formik, Field } from 'formik';
import * as Yup from 'yup';
import { StyledForm, Label, Button, ErrorMsg } from './ContactForm.styled';
import { useDispatch, useSelector } from 'react-redux';
import { selectContacts } from 'redux/contactsSlice';
import { addContact } from 'redux/operations';
import { Spinner } from 'components/Spinner';
import toast from 'react-hot-toast';
import { useState } from 'react';

export const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too Short!')
    .matches(
      /^[a-zA-Zа-яА-ЯіІєЄїЇю.]+(([' -][a-zA-Zа-яА-ЯіІєЄїЇ .])?[a-zA-Zа-яА-ЯіІєЄїЇ.]*)*$/,
      "Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
    )
    .required('Required'),
  phone: Yup.string()
    .matches(
      /\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}/,
      'Phone number must be digits and can contain spaces, dashes, parentheses and can start with +'
    )
    .required('Required'),
});

export const ContactForm = () => {
  const [isLoad, setIsLoad] = useState(false);
  const contacts = useSelector(selectContacts);
  const dispatch = useDispatch();

  const onFormSubmit = contactData => {
    const { name } = contactData;
    const isNameInContacts = contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );
    if (isNameInContacts) {
      toast.error(`${name} is alredy in contacts`);
      return;
    }
    setIsLoad(true);
    dispatch(addContact(contactData)).finally(() => {
      setIsLoad(false);
    });
  };

  return (
    <Formik
      initialValues={{ name: '', phone: '' }}
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
          Phone number
          <Field name="phone" type="tel" placeholder="067 123 45 67" />
          <ErrorMsg component="div" name="phone" />
        </Label>

        <Button type="submit" disabled={isLoad}>
          Add contact {isLoad && <Spinner />}
        </Button>
      </StyledForm>
    </Formik>
  );
};
