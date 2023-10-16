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
import { selectContacts } from 'redux/contacts/contactsSlice';
import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { Route, Routes } from 'react-router-dom';
import { Home } from 'pages/Home';
import { Login } from 'pages/Login';
import { Register } from 'pages/Register';
import { refreshUser } from 'redux/auth/operations';

export const App = () => {
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(fetchContacts());
  // }, [dispatch]);

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Routes>
    </div>
    // <PageWrapper>
    //   <GlobalStyle />
    //   <MainTitle>Phonebook</MainTitle>
    //   <ContactForm />
    //   <ContactListWraper>
    //     <Title>Contacts</Title>
    //     {contacts.length > 0 && (
    //       <>
    //         <Filter />
    //         <ContactList />
    //       </>
    //     )}
    //   </ContactListWraper>
    //   <Toaster position="top-right" />
    // </PageWrapper>
  );
};
