import { RotatingLines } from 'react-loader-spinner';

export const Spinner = () => {
  return (
    <RotatingLines
      strokeColor="grey"
      strokeWidth="5"
      animationDuration="0.75"
      width="18"
      visible={true}
    />
  );
};
