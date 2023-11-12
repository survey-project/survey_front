import React from 'react';
import { useNavigate } from 'react-router-dom';
import './sidebar.css'

const Sidebar = () => {
  const navigate = useNavigate();

  const goToafter = () => {
    navigate("/mainafter");
  }

  const goTomake = () => {
    navigate("/make");
  }
  
  const goToservey = () => {
    navigate("/mysurvey");
  }
  const goTomypage = () => {
    navigate("/mypage");
  }

  return (
    <aside className="sidebar">
      <ul>
        <li><a onClick={goToafter}>설문 리스트</a></li>
        <li><a onClick={goTomake}>설문 만들기</a></li>
        <li><a onClick={goToservey}>나의 설문</a></li>
        <li><a onClick={goTomypage}>마이페이지</a></li>
      </ul>
    </aside>
  );
};

export default Sidebar;
//로그인 전, 후 접근권한 달라짐??