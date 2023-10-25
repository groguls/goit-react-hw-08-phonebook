import { createSelector, createSlice } from '@reduxjs/toolkit';
import {
  addContact,
  deleteContact,
  editContact,
  fetchContacts,
} from './operations';

const initialState = {
  items: [],
  filter: '',
  error: null,
};

const handleRejected = (state, action) => {
  state.error = action.payload;
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    filterChange(state, action) {
      state.filter = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.error = null;
        state.items = action.payload;
      })
      .addCase(fetchContacts.rejected, handleRejected)
      .addCase(addContact.fulfilled, (state, action) => {
        state.error = null;
        state.items.push(action.payload);
      })
      .addCase(addContact.rejected, handleRejected)
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.error = null;
        state.items = state.items.filter(
          contact => contact.id !== action.payload.id
        );
      })
      .addCase(deleteContact.rejected, handleRejected)
      .addCase(editContact.fulfilled, (state, action) => {
        state.error = null;
        const index = state.items.findIndex(
          contact => contact.id === action.payload.id
        );
        state.items.splice(index, 1, action.payload);
      })
      .addCase(editContact.rejected, handleRejected);
  },
});

export const contactsReducer = contactsSlice.reducer;
export const { filterChange, chooseContact } = contactsSlice.actions;
export const selectFilter = state => state.contacts.filter;
export const selectContacts = state => state.contacts.items;
export const selectId = state => state.contacts.selectedId;
export const selectIsLoading = state => state.contacts.isLoading;
export const selectError = state => state.contacts.error;
export const selectFilteredContacts = createSelector(
  [selectContacts, selectFilter],
  (contacts, filter) =>
    contacts?.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    )
);
export const selectContact = createSelector(
  [selectContacts, selectId],
  (contacts, id) => contacts?.find(contact => contact.id === id)
);
