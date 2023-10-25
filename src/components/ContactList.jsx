import {
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectFilteredContacts } from 'redux/contacts/contactsSlice';

export const ContactList = () => {
  const contacts = useSelector(selectFilteredContacts);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const handleListItemClick = index => {
    setSelectedIndex(index);
  };

  if (contacts.length <= 0) return;

  return (
    <>
      <Divider />
      <List aria-label="contacts list">
        {contacts.map((contact, index) => (
          <ListItem key={contact.id} disablePadding>
            <ListItemButton
              component={Link}
              to={contact.id}
              selected={selectedIndex === index}
              onClick={() => handleListItemClick(index)}
            >
              <ListItemText primary={contact.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
    </>
  );
};
