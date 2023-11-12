import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../style/exit.css';
import Header from '../components/header';
import Sidebar from '../components/sidebar';
import Footer from '../components/footer';

function Exit(){
  const navigate = useNavigate();

  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  // 비밀번호 입력 시 상태 업데이트
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setError('');
  };

  // 회원탈퇴 버튼 클릭 시 처리
  const handleWithdrawal = async (e) => {
    e.preventDefault();

    try {
      const isConfirmed = window.confirm('탈퇴하시겠습니까?');

      if (isConfirmed) {
        const response = await axios.post('/api/withdrawal', { password });

        if (response.status === 200) {
          alert('회원탈퇴가 성공적으로 처리되었습니다.');
          navigate('/');
        } else {
          alert('회원탈퇴 처리 중 오류가 발생했습니다.');
        }
      } else {
        alert('탈퇴가 취소되었습니다.');
      }
    } catch (error) {
      console.error('회원탈퇴 중 오류 발생:', error);
      alert('회원탈퇴 처리 중 예기치 않은 오류가 발생했습니다.');
    }
  };

  return (
    <div className="exit-container">
      <Header />
      <div className="container">
        <Sidebar />
        <main>
          <div className="delete">
            <h2>회원탈퇴</h2>
                <form id="exit-form" onSubmit={handleWithdrawal}>
                <h4>버튼을 누르면 모든 데이터가 영구적으로 삭제되어 복구할 수 없게 됩니다.</h4>
                <input 
                  type="password" 
                  id="exit-pwd" 
                  placeholder="비밀번호를 입력해주세요." 
                  value={password}
                  onChange={handlePasswordChange}
                  required 
                />
                <br />
                <button type="submit" id="exitBtn">탈퇴</button>
                {error && <p className="error-message">{error}</p>}
                </form>
            </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Exit;