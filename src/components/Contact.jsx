import { useDispatch, useSelector } from 'react-redux';
import { deleteContact, editContact } from 'redux/contacts/operations';
import { useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  Typography,
} from '@mui/material';
import { selectContacts } from 'redux/contacts/contactsSlice';
import {
  ManageAccountsTwoTone,
  PersonRemoveTwoTone,
} from '@mui/icons-material';
import { useNavigate, useParams } from 'react-router-dom';
import { Field, Form, Formik } from 'formik';
import { SignupSchema } from 'components/AddContactForm';
import { TextField } from 'formik-mui';
import stc from 'string-to-color';

export const stringAvatar = name => {
  const nameArr = name.split(' ');
  return nameArr.length > 1
    ? `${nameArr[0][0]}${nameArr[1][0]}`
    : `${nameArr[0][0]}`;
};

export const Contact = () => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const { contactId: id } = useParams();
  const [isEdit, setIsEdit] = useState(false);
  const contacts = useSelector(selectContacts);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getContact = (contacts, id) =>
    contacts.find(contact => contact.id === id);
  const { name, number } = getContact(contacts, id);

  const toggleMenuOpen = () => setOpen(pState => !pState);

  const handleDelete = () => {
    setOpen(false);
    dispatch(deleteContact(id));
    navigate('/contacts', { replace: true });
  };

  const handleEdit = () => {
    setOpen(false);
    setIsEdit(true);
  };

  const validateName = name => {
    const currentIndex = contacts.findIndex(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );
    if (currentIndex !== -1 && contacts[currentIndex].id !== id) {
      return `${name} is alredy in contacts`;
    }
  };

  const onEditSubmit = values => {
    setLoading(true);
    dispatch(editContact({ id, values })).finally(() => {
      setLoading(false);
      setIsEdit(false);
    });
  };

  return (
    <>
      {!isEdit ? (
        <Card elevation={3}>
          <CardContent sx={{ display: 'flex' }}>
            <Box>
              <Avatar
                sx={{
                  width: 96,
                  height: 96,
                  bgcolor: stc(name),
                  textTransform: 'uppercase',
                  fontSize: 'h3.fontSize',
                }}
              >
                {stringAvatar(name)}
              </Avatar>
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                mb: 2,
                px: 5,
              }}
            >
              <Typography variant="h5" component="div">
                {name}
              </Typography>
              <Typography variant="h5" component="div">
                {number}
              </Typography>
            </Box>
          </CardContent>
          <CardActions
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
            }}
          >
            <Box sx={{ height: 80, transform: 'translateZ(0px)', flexGrow: 1 }}>
              <SpeedDial
                ariaLabel="Edit contact"
                sx={{ position: 'absolute', bottom: 16, right: 16 }}
                icon={<SpeedDialIcon />}
                onClose={toggleMenuOpen}
                onOpen={toggleMenuOpen}
                open={open}
              >
                <SpeedDialAction
                  icon={<PersonRemoveTwoTone />}
                  tooltipTitle={'Delete'}
                  tooltipOpen
                  onClick={handleDelete}
                />
                <SpeedDialAction
                  icon={<ManageAccountsTwoTone />}
                  tooltipTitle={'Edit'}
                  tooltipOpen
                  onClick={handleEdit}
                />
              </SpeedDial>
            </Box>
          </CardActions>
        </Card>
      ) : (
        <>
          <Card elevation={3}>
            <Formik
              initialValues={{ name, number }}
              validationSchema={SignupSchema}
              onSubmit={values => {
                onEditSubmit(values);
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
                    Update
                    {loading && <CircularProgress size={24} />}
                  </Button>
                  <Button variant="contained" onClick={() => setIsEdit(false)}>
                    Cancel
                  </Button>
                </CardActions>
              </Form>
            </Formik>
          </Card>
        </>
      )}
    </>
  );
};
