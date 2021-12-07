import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  let smallLogo = (
    <div id='small-nav-logo'>
      <img id='nav-logo' src="https://res.cloudinary.com/dd1ndszow/image/upload/v1638735300/Logo_eu5sbs.png" alt="logo" />
      <h2 id='nav-name'>ROASTED</h2>
    </div>
  )

  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
        <NavLink className='nav-link' to="/signup">Create An Account</NavLink>
        <LoginFormModal />
      </>
    );
  }

  return (
    <div id='navbar'>
      {sessionUser && smallLogo}
      <ul className='navbar-links'>
        <li>
          <NavLink className='nav-link' exact to="/">Home</NavLink>
          <NavLink className='nav-link' to="/coffees">Coffee List</NavLink>
          {isLoaded && sessionLinks}
        </li>
      </ul>
    </div>
  );
}

export default Navigation;
