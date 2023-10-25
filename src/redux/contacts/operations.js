import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import toast from 'react-hot-toast';

export const fetchContacts = createAsyncThunk(
  'contacts/fetchAll',
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get('/contacts');
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addContact = createAsyncThunk(
  'contacts/addContact',
  async (contactData, thunkAPI) => {
    try {
      const { data } = await axios.post('/contacts', contactData);
      toast.success('Successfully added');
      return data;
    } catch (error) {
      toast.error('Something went wrong, try reloading the page');
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async (id, thunkAPI) => {
    try {
      const { data } = await axios.delete(`/contacts/${id}`);
      toast.success('Successfully deleted');
      return data;
    } catch (error) {
      toast.error('Something went wrong, try reloading the page');
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const editContact = createAsyncThunk(
  'contacts/editContact',
  async (editedContact, thunkAPI) => {
    const { id, values } = editedContact;
    try {
      const { data } = await axios.patch(`/contacts/${id}`, values);
      toast.success('Successfully updated');
      return data;
    } catch (error) {
      toast.error('Something went wrong, try reloading the page');
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
