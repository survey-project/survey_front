import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../style/login.css';
import Header from '../components/header';
import Sidebar from '../components/sidebar';
import Footer from '../components/footer';

function Login ()  {
  const navigate = useNavigate();

  const [selectedOption, setSelectedOption] = useState(''); 
  const [name, setName] = useState('');
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [gender, setGender] = useState('');
  const [department, setDepartment] = useState('');//사용자의 학과 저장
  const [grade, setGrade] = useState('1');
  const [birthdate, setBirthdate] = useState('');

  //현재 날짜를 가져와서 설정
  useEffect(() => {
    const currentDate = new Date().toISOString().split('T')[0];
    setBirthdate(currentDate);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 기입한 정보를 서버로 보내어 가입 요청
    try {
      const response = await axios.post('/api/signup', {
        userType: selectedOption,
        name,
        userId,
        password,
        confirmPassword,
        gender,
        department,
        grade,
        birthdate,
      });
      console.log(response); // 제대로 보내지는지 확인하고싶은데..

      if (response.status === 200) {
        alert('가입이 성공적으로 완료되었습니다.');
        navigate('/mainbefore');
      } else {
        alert('가입 중 오류가 발생했습니다.');
      }
    } catch (error) {
      console.error('가입 중 오류 발생:', error);
      alert('오류가 발생했습니다.');
    }
  };
  return (
    <div className="login-container">
      <Header />
      <div className="container">
        <Sidebar />
        <main>
        <div className="login">
      <h2>회원가입</h2>
      <form id="login-form" onSubmit={handleSubmit}>
        <div id="select-job">
          <label>
            <input type="radio" name="option" value="student" 
            onChange={(e) => setSelectedOption(e.target.value)}
            checked={selectedOption === 'student'}/>
            학생
          </label>
          <label>
            <input type="radio" name="option" value="faculty" 
            onChange={(e) => setSelectedOption(e.target.value)}
            checked={selectedOption === 'faculty'}/>
            교직원
          </label>
          <label>
            <input type="radio" name="option" value="admin" 
            onChange={(e) => setSelectedOption(e.target.value)}
            checked={selectedOption === 'admin'}/>
            관리자
          </label>
        </div>
        <input type="text" id="username" placeholder="이름을 입력해주세요." 
          value={name}
          onChange={(e) => setName(e.target.value)}
          required />
          <br />
        <input type="userid" id="userid" placeholder="학번 / 교번을 입력해주세요." 
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          required
        />
       <br />
        <input type="password" id="password" placeholder="비밀번호를 입력해주세요."
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        />
        <br />
        <input type="password" id="pwd" placeholder="비밀번호를 재입력해주세요." 
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
        />
        <br />
        <div className="gender">
          <input type="radio" id="male" name="gen" value="male" onChange={(e) => setGender(e.target.value)} checked={gender === 'male'}/>
          <label htmlFor="male">남자</label>
          <input type="radio" id="female" name="gen" value="female" onChange={(e) => setGender(e.target.value)} checked={gender === 'female'}/>
          <label htmlFor="female">여자</label>
        </div>
        <div className="depar">
          <div className="depart1">
          <label htmlFor="depart">학과:</label>
          <select
            name="department"
            id="depart"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}>
              <option value="com">컴퓨터공학과</option>
              <option value="elec">전자공학부</option>
              <option value="commu">정보통신공학부</option>
              <option value="ai">인공지능공학과</option>
          </select>
          </div>
          <div className="major">
            <label htmlFor="grade">학년:</label>
            <select name="grade" id="grade" value={grade}
            onChange={(e) => setGrade(e.target.value)} >
              <option value="1">1학년</option>
              <option value="2">2학년</option>
              <option value="3">3학년</option>
              <option value="4">4학년</option>
              <option value="5">교직원</option>
              <option value="6">관리자</option>
            </select>
          </div>
        </div>
        <input type="date" id="date" name="date" value={birthdate} onChange={(e) => setBirthdate(e.target.value)}/> {/* 현재날짜를 가입날짜로 */}
        <button id="loginBtn" type="submit">가입</button>
      </form>
    </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Login;

//한개라도 입력 안하면 alert창 띄우고
