import {
  ContactListWraper,
  GlobalStyle,
  MainTitle,
  PageWrapper,
  Title,
} from './GlobalStyle';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { useDispatch, useSelector } from 'react-redux';
import { selectContacts } from 'redux/contactsSlice';
import { useEffect } from 'react';
import { fetchContacts } from 'redux/operations';
import { Toaster } from 'react-hot-toast';

export const App = () => {
  const contacts = useSelector(selectContacts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <PageWrapper>
      <GlobalStyle />
      <MainTitle>Phonebook</MainTitle>
      <ContactForm />
      <ContactListWraper>
        <Title>Contacts</Title>
        {contacts.length > 0 && (
          <>
            <Filter />
            <ContactList />
          </>
        )}
      </ContactListWraper>
      <Toaster position="top-right" />
    </PageWrapper>
  );
};
