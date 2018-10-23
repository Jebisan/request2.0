import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { startLogout } from '../actions/auth';

export const Header = ({ startLogout }) => (
  <header className="header"></header>
);

const mapDispatchToProps = (dispatch) => ({
  startLogout: () => dispatch(startLogout())
});

export default connect(undefined, mapDispatchToProps)(Header);
