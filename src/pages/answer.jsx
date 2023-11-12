import React, { useState } from 'react';
import '../style/answer.css';
import Header from '../components/header';
import Sidebar from '../components/sidebar';
import Footer from '../components/footer';

function AnswerSurvey() {
    // 각 질문에 대한 상태값을 초기화합니다.
    const [answers, setAnswers] = useState({
        question1: [],
        question2: '',
        question3: '',
        question4: '',
    });

    // 체크박스가 선택될 때 호출되는 함수입니다.
    const handleCheckboxChange = (e) => {
        const { name, value, checked } = e.target;

        // 체크박스가 선택되면 선택된 값(value)을 배열에 추가하고,
        // 선택이 해제되면 해당 값을 배열에서 제거합니다.
        const updatedAnswers = { ...answers };
        if (checked) {
            updatedAnswers[name].push(value);
        } else {
            updatedAnswers[name] = updatedAnswers[name].filter((item) => item !== value);
        }

        setAnswers(updatedAnswers);
    };

    // 라디오 버튼이 선택될 때 호출되는 함수입니다.
    const handleRadioChange = (e) => {
        const { name, value } = e.target;

        const updatedAnswers = { ...answers };
        updatedAnswers[name] = value;

        setAnswers(updatedAnswers);
    };

    // 텍스트 입력이 변경될 때 호출되는 함수입니다.
    const handleTextChange = (e) => {
        const { name, value } = e.target;

        const updatedAnswers = { ...answers };
        updatedAnswers[name] = value;

        setAnswers(updatedAnswers);
    };

    // 폼 제출 시 폼 데이터(answers)를 출력합니다.
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('폼 데이터:', answers);
    };

    return (
    <div className="exit-container">
      <Header />
      <div className="container">
        <Sidebar />
        <main>
        <div>
            <h2>질문 및 응답</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <p><strong>질문 1</strong></p>
                    <label>
                        <input
                            type="checkbox"
                            name="question1"
                            value="택1"
                            onChange={handleCheckboxChange}
                        />
                        택1
                    </label><br />
                    <label>
                        <input
                            type="checkbox"
                            name="question1"
                            value="택2"
                            onChange={handleCheckboxChange}
                        />
                        택2
                    </label><br />
                    <label>
                        <input
                            type="checkbox"
                            name="question1"
                            value="택3"
                            onChange={handleCheckboxChange}
                        />
                        택3
                    </label><br />
                    <label>
                        <input
                            type="checkbox"
                            name="question1"
                            value="택4"
                            onChange={handleCheckboxChange}
                        />
                        택4
                    </label><br />
                </div>

                <div>
                    <p><strong>질문 2</strong></p>
                    <label>
                        <input
                            type="radio"
                            name="question2"
                            value="택1"
                            onChange={handleRadioChange}
                        />
                        택1
                    </label><br />
                    <label>
                        <input
                            type="radio"
                            name="question2"
                            value="택2"
                            onChange={handleRadioChange}
                        />
                        택2
                    </label><br />
                    <label>
                        <input
                            type="radio"
                            name="question2"
                            value="택3"
                            onChange={handleRadioChange}
                        />
                        택3
                    </label><br />
                    <label>
                        <input
                            type="radio"
                            name="question2"
                            value="택4"
                            onChange={handleRadioChange}
                        />
                        택4
                    </label><br />
                </div>

                <div>
                    <p><strong>질문 3</strong></p>
                    <input
                        type="text"
                        name="question3"
                        className="textarea"
                        placeholder="여기에 입력하세요"
                        onChange={handleTextChange}
                    />
                </div>

                <div>
                    <p><strong>질문 4</strong></p>
                    <textarea
                        name="question4"
                        className="textarea"
                        rows="4"
                        cols="50"
                        placeholder="자유롭게 응답해주세요"
                        onChange={handleTextChange}
                    ></textarea>
                </div>

                <button type="submit">제출</button>
            </form>
        </div>
        </main>
      </div>
      <Footer />
    </div>
    );
}

export default AnswerSurvey;