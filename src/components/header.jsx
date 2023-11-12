import React from 'react';
import './header.css';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  const goToSign = () => {
    navigate("/login");
  }

  const goToLogin = () => {
    navigate("/")
  }
  return (
    <header className="header">
      <img className='logo' src={process.env.PUBLIC_URL + './image_2.png'} alt="logo" />

      <h1>Chosun.survey</h1>
      <nav>
        <h3><a onClick={goToLogin}>로그인</a></h3>
        <h3><a onClick={goToSign}>회원가입</a></h3>
      </nav>
    </header>
  );
};
export default Header;

//로그인 전 후 다르게 나와야 하는데 어떻게 할거니