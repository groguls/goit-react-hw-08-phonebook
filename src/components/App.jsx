import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Login } from 'pages/Login';
import { Register } from 'pages/Register';
import { refreshUser } from 'redux/auth/operations';
import { Layout } from './Layout';
import { Contacts } from 'pages/Contacts';
import { PrivateRoute } from './PrivateRoute';
import { RestrictedRoute } from './RestrictedRoute';
import { Contact } from './Contact';
import { AddContactForm } from './AddContactForm';
import { Home } from 'pages/Home';
import { LinearProgress } from '@mui/material';
import { useAuth } from 'hooks/useAuth';

export const App = () => {
  const { isRefreshing } = useAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return isRefreshing ? (
    <LinearProgress />
  ) : (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route
          path="contacts"
          element={
            <PrivateRoute redirectTo="/login" component={<Contacts />} />
          }
        >
          <Route
            path="add"
            element={
              <PrivateRoute
                redirectTo="/login"
                component={<AddContactForm />}
              />
            }
          />
          <Route
            path=":contactId"
            element={
              <PrivateRoute redirectTo="/login" component={<Contact />} />
            }
          />
        </Route>
        <Route
          path="login"
          element={
            <RestrictedRoute redirectTo="/contacts" component={<Login />} />
          }
        />
        <Route
          path="register"
          element={
            <RestrictedRoute redirectTo="/contacts" component={<Register />} />
          }
        />
        <Route path="*" element={<Home />} />
      </Route>
    </Routes>
  );
};
