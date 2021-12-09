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
    <a href="/">
      <div id='small-nav-logo'>
        <img id='nav-logo' src="https://res.cloudinary.com/dd1ndszow/image/upload/v1638735300/Logo_eu5sbs.png" alt="logo" />
        <h2 id='nav-name'>ROASTED</h2>
      </div>
    </a>
  )

  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
        <NavLink className='navlink' to="/signup">Create An Account</NavLink>
        <LoginFormModal />
      </>
    );
  }

  return (
    <div id='navbar'>
      {sessionUser && smallLogo}
      <ul className='navbar-links'>
        <li>
          <NavLink className='navlink' exact to="/">Home</NavLink>
          <NavLink className='navlink' exact to="/coffees">Coffee List</NavLink>
          <NavLink className='navlink' exact to="/checkins">Check-in Feed</NavLink>
          {isLoaded && sessionLinks}
        </li>
      </ul>
    </div>
  );
}

export default Navigation;
