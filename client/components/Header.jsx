import React from 'react';
import '../styles/Header.scss';

const Header = function ({ company }) {
  return <div className="header">{company}</div>;
};

export default Header;
