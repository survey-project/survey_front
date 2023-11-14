import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'

import '../style/mysurvey.css';
import Header from '../components/header';
import Sidebar from '../components/sidebar';
import Footer from '../components/footer';

function Mysurvey(){
  const [surveys, setSurveys] = useState([]);
  // 가상의 설문 데이터(테스트용)
  const dummySurveys = [
    { id: 1, title: '가장 선호하는 동물은?', completedAt: '2025-01-01 --:--' },
    { id: 2, title: '가장 선호하는 영화는?', completedAt: '2025-01-01 --:--' },
    { id: 3, title: '물가상승률을 크게 체감하는 상황은?', completedAt: '2025-01-01 --:--' },
  ];
  /*
  useEffect(() => {
    // Assuming your backend has an endpoint like `/api/my-surveys`
    axios.get('/api/my-surveys')
      .then(response => {
        setSurveys(response.data);
      })
      .catch(error => {
        console.error('Error fetching survey list:', error);
      });
  }, []);*/

  return (
    <div className="exit-container">
      <Header />
      <div className="container">
        <Sidebar />
        <main>
            <div className="btn-group">
              <a href="/result1" id="btn1">만든설문</a>
              <a href="/mysurvey" id="btn">작성한설문</a>
            </div>
            <table className = "custom-table">
            <tr>
                <td>번호</td>
                <td>제목</td>
                <td>설문완료일시</td>
            </tr>
            <tbody>
              {dummySurveys.map((survey, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    <Link to={`/answersurvey/${survey.id}`}
                    style={{ textDecoration: 'none', color: 'inherit' }}>
                    {survey.title}</Link>
                  </td>
                  <td>{survey.completedAt}</td>
                </tr>
              ))}
            </tbody>
            </table>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Mysurvey;
//제목을 선택하면 해당 응답 페이지로 이동
