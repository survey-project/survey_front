import React, { useState } from 'react';
import axios from 'axios';
import '../style/make.css';
import Header from '../components/header';
import Sidebar from '../components/sidebar';
import Footer from '../components/footer';

function MakeSurvey() {
    const [surveyInfo, setSurveyInfo] = useState({
        title: '',
        creator: '',
        target: '',
        dateRange: '',
        introduction: '',
    });

    const [question, setQuestion] = useState({
        title: '',
        questionType: 'checkbox',
        options: [{ text: '옵션 1', checked: false }],
    });
    const [savedQuestions, setSavedQuestions] = useState([]); // 질문 정보 저장 배열

    const handleChangeSurveyInfo = (e) => {
        const { name, value } = e.target;
        setSurveyInfo({ ...surveyInfo, [name]: value });
    };

    const handleChangeQuestion = (e) => {
        const { name, value } = e.target;

        if (name === 'questionType') {
            // 질문 유형이 변경되면 기존 질문과 옵션 초기화
            setQuestion({
                title: '',
                questionType: value,
                options: [],
            });
        } else {
            // 다른 질문 관련 정보 업데이트
            setQuestion((prevQuestion) => ({
                ...prevQuestion,
                [name]: value,
            }));
        }
    };


    const handleAddOption = () => {
        if (questionType === 'text' || questionType === 'textarea') {
            // 단답형과 장문형인 경우
            if (question.options.length === 0) {
                // 아직 옵션이 없는 경우에만 추가
                setQuestion({
                    ...question,
                    options: [{ text: '', checked: false }],
                });
            }
        } else {
            // 다른 질문 유형인 경우
            setQuestion({
                ...question,
                options: [...question.options, { text: '', checked: false }],
            });
        }
    };


    const [questionType, setQuestionType] = useState('checkbox');
    const handleSaveQuestion = () => {
        // 현재 질문 정보를 저장 배열에 추가
        setSavedQuestions([...savedQuestions, question]);
        // 현재 질문 정보 초기화
        setQuestion({
            title: '',
            questionType: 'checkbox',
            options: [{ text: '옵션 1', checked: false }],
        });
    };
    const handleSubmit = async () => {
        try {
            // surveyInfo와 question 데이터를 서버로 전송하는 코드 작성
            const response = await axios.post('/api/create-survey', {
                surveyInfo,
                question,
            });
            console.log('설문 등록 성공:', response.data);
        } catch (error) {
            console.error('설문 등록 실패:', error);
        }
    };

    return (
        <div className="exit-container">
            <Header />
            <div className="container">
                <Sidebar />
                <main>
                    <div>

                        <table className="custom-table">
                            <tbody>
                            <tr>
                                <td>제목</td>
                                <td>
                                    <input
                                        type="text"
                                        name="title"
                                        value={surveyInfo.title}
                                        onChange={handleChangeSurveyInfo}
                                    />
                                </td>
                                <td>설문 등록자</td>
                                <td>
                                    <input
                                        type="text"
                                        name="creator"
                                        value={surveyInfo.creator}
                                        onChange={handleChangeSurveyInfo}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>설문대상</td>
                                <td>
                                    <input
                                        type="text"
                                        name="target"
                                        value={surveyInfo.target}
                                        onChange={handleChangeSurveyInfo}
                                    />
                                </td>
                                <td>시작-마감일</td>
                                <td>
                                    <input
                                        type="text"
                                        name="dateRange"
                                        value={surveyInfo.dateRange}
                                        onChange={handleChangeSurveyInfo}
                                    />
                                </td>
                            </tr>
                            </tbody>
                        </table>

                        <table className="custom-table">
                            <tbody>
                            <tr>
                                <td>설문지 소개</td>
                                <td>
                                    <input
                                        type="text"
                                        name="introduction"
                                        value={surveyInfo.introduction}
                                        onChange={handleChangeSurveyInfo}
                                        placeholder="부가설명을 작성해주세요"
                                    />
                                </td>
                            </tr>
                            </tbody>
                        </table>

                        <div className="custom-box">
                            <input
                                type="text"
                                name="title"
                                value={question.title}
                                onChange={handleChangeQuestion}
                                placeholder="질문 제목을 입력하세요"
                            />
                            <select
                                className="form-select"
                                name="questionType"
                                value={questionType}
                                onChange={(e) => {
                                    setQuestionType(e.target.value);
                                    handleChangeQuestion(e);
                                }}
                            >
                                <option value="checkbox">체크박스</option>
                                <option value="radio">단일선택</option>
                                <option value="text">단답형</option>
                                <option value="textarea">장문형</option>
                            </select>

                            {questionType === 'checkbox' && (
                                <div className="option">
                                    {/* 체크박스 관련 입력란을 렌더링하세요. */}
                                </div>
                            )}

                            {questionType === 'radio' && (
                                <div className="option">
                                    {/* 단일선택 관련 입력란을 렌더링하세요. */}
                                </div>
                            )}

                            {questionType === 'text' && (
                                <div className="option">
                                    {/* 단답형 관련 입력란을 렌더링하세요. */}
                                </div>
                            )}

                            {questionType === 'textarea' && (
                                <div className="option">
                                    {/* 장문형 관련 입력란을 렌더링하세요. */}
                                </div>
                            )}

                            <div className="option">
                                {question.options.map((option, index) => (
                                    <div key={index} className="option-row">
                                        <input
                                            type={question.questionType}
                                            name="options"
                                            checked={option.checked}
                                            onChange={(e) => {
                                                const newOptions = [...question.options];
                                                newOptions[index].checked = e.target.checked;
                                                setQuestion({ ...question, options: newOptions });
                                            }}
                                        />
                                        <input
                                            type="text"
                                            name="options"
                                            value={option.text}
                                            onChange={(e) => {
                                                const newOptions = [...question.options];
                                                newOptions[index].text = e.target.value;
                                                setQuestion({ ...question, options: newOptions });
                                            }}
                                            placeholder={`옵션 ${index + 1}`}
                                            className="option-input"
                                        />
                                    </div>
                                ))}
                            </div>
                            <button type="button" onClick={handleAddOption}>
                                옵션 추가
                            </button>
                            <button type="button" onClick={handleSaveQuestion}>
                                저장
                            </button>
                        </div>

                        <div>
                            {/* 저장된 질문 정보를 나타내는 부분 */}
                            <h3>저장된 질문</h3>
                            <ul>
                                {savedQuestions.map((savedQuestion, index) => (
                                    <li key={index}>
                                        {savedQuestion.title} - {savedQuestion.questionType}
                                    </li>
                                ))}
                            </ul>
                        </div>


                        <a href="/mainafter">
                            <button type="button" onClick={handleSubmit}>
                                확인
                            </button>
                        </a>
                    </div>
                </main>
            </div>
            <Footer />
        </div>
    );
}

export default MakeSurvey;