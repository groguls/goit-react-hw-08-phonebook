import { styled } from 'styled-components';

export const ContactItem = styled.li`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  margin-bottom: 4px;

  &:nth-child(odd) {
    background-color: rgba(0, 149, 255, 0.15);
  }
`;

export const ContactButton = styled.button`
  display: flex;
  gap: 4px;
  background-color: #e1ecf4;
  border-radius: 3px;
  border: 1px solid #7aa7c7;
  color: #39739d;
  cursor: pointer;
  padding: 4px 12px;
  margin-left: 4px;

  &:hover,
  :focus {
    background-color: #b3d3ea;
    color: #2c5777;
    box-shadow: 0 0 3px 3px rgba(0, 149, 255, 0.15);
  }
`;

export const ContactWrap = styled.div`
  display: flex;
  justify-content: space-between;
  width: 350px;
`;
