import { Label } from 'components/ContactForm/ContactForm.styled';
import { useDispatch, useSelector } from 'react-redux';
import { filterChange, selectFilter } from 'redux/filterSlice';

export const Filter = () => {
  const filter = useSelector(selectFilter);
  const dispatch = useDispatch();

  const handleFilterChange = evt => {
    dispatch(filterChange(evt.currentTarget.value));
  };

  return (
    <Label>
      Find contacts by name
      <input
        type="text"
        placeholder="Enter contact name"
        value={filter}
        onChange={handleFilterChange}
      />
    </Label>
  );
};
