import React from 'react';
import '../styles/Header.scss';

function Header({ company }) {
  return <div className='header'>{company}</div>
}

export default Header;