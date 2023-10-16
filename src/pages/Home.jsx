import { NavLink } from 'react-router-dom';

export const Home = () => {
  return (
    <>
      <div>
        <NavLink to="login">Login</NavLink>
        <NavLink to="register">Register</NavLink>
        <p>
          Welcome to the Contacts app. Please log in or register to take
          advantage of the full functionality.
        </p>
      </div>
    </>
  );
};
