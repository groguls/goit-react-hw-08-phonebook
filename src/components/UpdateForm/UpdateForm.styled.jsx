import { ErrorMessage, Field, Form } from 'formik';
import { styled } from 'styled-components';

export const StyledForm = styled(Form)`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  margin-bottom: 4px;

  border-radius: 5px;
  border: 2px #e1ecf4 solid;
  box-shadow: inset 0 0 15px 4px rgba(0, 149, 255, 0.15);
`;

export const StyledInput = styled(Field)`
  width: 175px;
`;

export const InputWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 350px;
`;

export const ErrorMsg = styled(ErrorMessage)`
  color: red;
  font-size: 14px;
`;
