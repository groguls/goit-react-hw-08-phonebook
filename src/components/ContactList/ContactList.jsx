import { Contact } from 'components/Contact/Contact';
import { useSelector } from 'react-redux';
import { selectFilteredContacts } from 'redux/contactsSlice';

export const ContactList = () => {
  const contacts = useSelector(selectFilteredContacts);

  return (
    <ul>
      {contacts.map(contact => (
        <Contact key={contact.id} {...contact} />
      ))}
    </ul>
  );
};
