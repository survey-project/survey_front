import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../style/mypage.css';
import Header from '../components/header';
import Sidebar from '../components/sidebar';
import Footer from '../components/footer';

function Mypage () {
    const [userType, setUserType] = useState('');
    const [name, setName] = useState('');
    const [userId, setUserId] = useState('');
    const [gender, setGender] = useState('');
    const [department, setDepartment] = useState(''); //사용자의 학과 저장
    const [grade, setGrade] = useState('');
    
    const [departments, setDepartments] = useState([]); // 학과 목록

    useEffect(() => {
        axios.get('/api/departments') // 학과 목록 불러오기
            .then(response => setDepartments(response.data.departments))
            .catch(error => console.error('학과 목록을 불러오는 중 오류 발생:', error));

        axios.get('/api/user')
            .then(response => {
                const userData = response.data;
                setUserType(userData.userType);
                setName(userData.name);
                setUserId(userData.userId);
                setGender(userData.gender);
                setDepartment(userData.department);
                setGrade(userData.grade);
            })
            .catch(error => console.error('회원 정보를 불러오는 중 오류 발생:', error));
    }, []);

    const handleSubmit = async (e) => {//수정된 정보 보내기
        e.preventDefault();
        try {
        const response = await axios.put('/api/user', {
            userType,
            name,
            userId,
            gender,
            department,
            grade,
        });

        if (response.status === 200) {
            alert('회원 정보가 성공적으로 수정되었습니다.');
        } else {
            alert('회원 정보 수정 중 오류가 발생했습니다.');
        }
        } catch (error) {
        console.error('회원 정보 수정 중 오류 발생:', error);
        alert('회원 정보 수정 중 예기치 않은 오류가 발생했습니다.');
        }
    };
  return (
    <div className="exit-container">
      <Header />
      <div className="container">
        <Sidebar />
        <main>
            <div className="signup">
                <h2>회원정보수정</h2>
                <form id="mypage-form" onSubmit={handleSubmit}>
                    <div className="select-job">
                        <label>
                            <input type="radio" name="option" value="student" />학생
                        </label>
                        <label>
                            <input type="radio" name="option" value="faculty" />교직원
                        </label>
                        <label>
                            <input type="radio" name="option" value="admin" />관리자
                        </label>
                    </div>
                    <input type="text" id="username" placeholder="이름을 입력해주세요." value={name} onChange={(e) => setName(e.target.value)} required /><br />
                    <input type="userid" id="userid" placeholder="학번 / 교번을 입력해주세요." value={userId} onChange={(e) => setUserId(e.target.value)} required /><br />
                    <input type="password" id="password" placeholder="비밀번호를 입력해주세요." required /><br />
                    <input type="password" id="pwd" placeholder="비밀번호를 재입력해주세요." required /><br />
                    <div className="gender">
                        <input type="radio" id="male" name="gen" value="female" 
                        onChange={(e) => setGender(e.target.value)} //체크 상태 변경 시 핸들러 필요
                        checked={gender === 'male'} />
                        <label htmlFor="male">남자</label>
                        <input type="radio" id="female" name="gen" value="female" 
                        onChange={(e) => setGender(e.target.value)}
                        checked={gender === 'female'}/>
                        <label htmlFor="female">여자</label>
                    </div>
                    <div className="sort">
                        <div className="dropdown1">
                            <label htmlFor="depart">학과:</label>
                            <select name="department" id="depart" value={department}
                            onChange={(e) => setDepartment(e.target.value)} >
                                {departments.map(dep => (
                                    <option key={dep.id} value={dep.name}>
                                        {dep.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="dropdown2">
                            <label htmlFor="grade">학년:</label>
                            <select name="department" id="grade" value={grade} onChange={(e) => setGrade(e.target.value)} >
                                <option value="1">1학년</option>
                                <option value="2">2학년</option>
                                <option value="3">3학년</option>
                                <option value="4">4학년</option>
                                <option value="5">교직원</option>
                                <option value="6">관리자</option>
                            </select>
                        </div>
                    </div> 
                    <button id="re" type="submit">수정</button>
                </form>
                <a href="/exit"> 
                    <button id="myexit">탈퇴</button>
                </a>
            </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Mypage;