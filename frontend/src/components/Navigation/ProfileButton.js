import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import * as sessionActions from '../../store/session';
import './Navigation.css';

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const [numOfCoffees, setNumOfCoffees] = useState(0);
  const [numOfCheckins, setNumOfCheckins] = useState(0);
  const sessionUser = useSelector(state => state.session.user)

  const openMenu = async () => {
    if (showMenu) return;
    setShowMenu(true);

    const userStats = await dispatch(sessionActions.getAUser(sessionUser.id))
    setNumOfCoffees(userStats.Coffees.length)
    setNumOfCheckins(userStats.Checkins.length)
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  return (
    <>
      <button onClick={openMenu}>
        <i className="far fa-user fa-lg" />
      </button>
      {showMenu && (
        <ul className="profile-dropdown">
          <li> <i className="fas fa-user-check"></i> {user.username}</li>
          <li> <i className="far fa-envelope"></i> {user.email}</li>
          <li>
            <button id='logout-button' onClick={logout}>Log Out</button>
          </li>
          <li id='stats'>Stats</li>
          <li><i className="fas fa-coffee"></i> {numOfCoffees}</li>
          <li><i className="far fa-check-circle"></i> {numOfCheckins}</li>
        </ul>
      )}
    </>
  );
}

export default ProfileButton;
