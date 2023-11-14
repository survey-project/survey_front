import React, { useEffect, useState } from 'react';
import '../style/result1.css';
import Header from '../components/header';
import Sidebar from '../components/sidebar';
import Footer from '../components/footer';

function Result1(){
    const [surveys, setSurveys] = useState([]);

    useEffect(() => {
        // API에서 설문 목록 데이터를 가져오는 로직을 추가해야 합니다.
        // 예: axios 또는 fetch를 사용하여 API 요청을 보냅니다.
        // 서버에서 설문 목록 데이터를 가져와서 setSurveys로 설정합니다.

        // 가상의 데이터 예시
        const mockSurveys = [
            { id: 1, title: '가장 선호하는 여...', creator: '20254444', date: '----.--.---', deadline: 'D-7' },
            // 다른 설문 데이터 추가
        ];

        setSurveys(mockSurveys); // 서버에서 받아온 데이터로 설정해야 합니다.
    }, []);

    return (
        <div className="exit-container">
            <Header />
            <div className="container">
                <Sidebar />
                <main>
                    <div className="btn-group">
                        <a href="/result1" id="btn">만든설문 </a>
                        <a href="/mysurvey" id="btn1">작성한설문</a>
                    </div>
                        <table className="custom-table">
                            <tr>
                                <th>번호</th>
                                <th>제목</th>
                                <th>통계</th>
                                <th>등록자</th>
                                <th>등록일자</th>
                                <th>마감일</th>
                            </tr>
                            <tbody>
                            {surveys.map((survey) => (
                                <tr key={survey.id}>
                                    <td>{survey.id}</td>
                                    <td>{survey.title}</td>
                                    <td>
                                        <a href="/result2">
                                            <button>보기</button>
                                        </a>
                                    </td> {/* 보기 버튼 추가 */}
                                    <td>{survey.creator}</td>
                                    <td>{survey.date}</td>
                                    <td>{survey.deadline}</td>
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

export default Result1;
//통계 버튼 해당 result2 페이지로 이동해야함(설문마다 다름)
