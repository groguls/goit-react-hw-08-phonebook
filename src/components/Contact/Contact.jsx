import { useDispatch } from 'react-redux';
import { ContactButton, ContactItem, ContactWrap } from './Contact.styled';
import { deleteContact } from 'redux/operations';
import { useState } from 'react';
import { UpdateForm } from 'components/UpdateForm/UpdateForm';
import { ButtonsWrap } from 'components/ContactForm/ContactForm.styled';
import { Spinner } from 'components/Spinner';

export const Contact = ({ id, name, phone }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [isLoad, setIsLoad] = useState(false);
  const dispatch = useDispatch();

  const handleDelete = () => {
    setIsLoad(true);
    dispatch(deleteContact(id)).finally(() => {
      setIsLoad(false);
    });
  };

  return (
    <>
      {!isEdit ? (
        <ContactItem>
          <ContactWrap>
            <p>{name}</p>
            <p>{phone}</p>
          </ContactWrap>
          <ButtonsWrap>
            <ContactButton
              type="button"
              onClick={() => {
                setIsEdit(true);
              }}
            >
              Edit
            </ContactButton>
            <ContactButton
              type="button"
              onClick={handleDelete}
              disabled={isLoad}
            >
              Delete {isLoad && <Spinner />}
            </ContactButton>
          </ButtonsWrap>
        </ContactItem>
      ) : (
        <UpdateForm id={id} name={name} phone={phone} handleEdit={setIsEdit} />
      )}
    </>
  );
};
