import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/mainbefore.css';
import axios from 'axios';
import Header from '../components/header';
import Sidebar from '../components/sidebar';
import Footer from '../components/footer';

function Mainbefore () {
  const navigate = useNavigate(); 

  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedOption) {
      alert('유형을 선택해주세요.');
      return;
    }

    try {
      const response = await axios.post('/api/mainbefore', {
        userId,
        password,
        userType: selectedOption,
      });

      if (response.status === 200) {
        navigate('/mainafter'); //로그인 성공
      } else {
        alert('로그인 실패. 입력 값을 확인해주세요.');
      }
    } catch (error) {
      console.error('로그인 중 오류 발생:', error);
      alert('로그인 중 예기치 않은 오류가 발생했습니다.');
    }
  };

  return (
    <div className="mainbefore-container">
      <Header />
      <div className="container">
        <Sidebar />
        <main>
          <div className="mainbefore">
            <h2>로그인</h2>
            <form id="mainbefore-form" onSubmit={handleSubmit}>
                  <label>
                    <input type="radio" name="option" value="student" onChange={(e) => setSelectedOption(e.target.value)}/>
                    학생
                  </label>
                  <label>
                    <input type="radio" name="option" value="faculty" onChange={(e) => setSelectedOption(e.target.value)}/>
                    교직원
                  </label>
                  <label>
                    <input type="radio" name="option" value="admin" onChange={(e) => setSelectedOption(e.target.value)}/>
                    관리자
                  </label>
              <br /><br />
              <input type="text" id="userid" placeholder="아이디" value={userId} onChange={(e) => setUserId(e.target.value)} required />
              <br />
              <input type="password" id="password" placeholder="비밀번호" value={password} onChange={(e) => setPassword(e.target.value)} required />
              <br /><br />
              <button type="submit" id="loginBtn">로그인</button>
            </form>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Mainbefore;