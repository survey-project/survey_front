import React, { useState, useEffect } from 'react';
import  Chart from 'chart.js/auto';
import axios from 'axios';
import '../style/result2.css';
import Header from '../components/header';
import Sidebar from '../components/sidebar';
import Footer from '../components/footer';

function Result2() {
  const [questionData, setQuestionData] = useState([]);

  useEffect(() => {
    /*axios.get('/api/result2')
      .then(response => {
        setQuestionData(response.data);
      })
      .catch(error => {
        console.error('Error fetching result data:', error);
      });
      */
    const mockData = [ //임의의 데이터(테스트 용)
      {
        id: 1,
        title: '질문 1',
        type: 'checkbox',
        options: [
          { id: 1, value: '옵션 1', count: 10 },
          { id: 2, value: '옵션 2', count: 15 },
          { id: 3, value: '옵션 3', count: 5 },
        ],
      },
      {
        id: 2,
        title: '질문 2',
        type: 'radio',
        options: [
          { id: 4, value: '옵션 1', count: 8 },
          { id: 5, value: '옵션 2', count: 12 },
          { id: 6, value: '옵션 3', count: 20 },
        ],
      },
      {
        id: 3,
        title: '질문 3',
        type: 'text',
        options: [],
      },
      {
        id: 4,
        title: '질문 4',
        type: 'textarea',
        options: [],
      },
    ];

    setQuestionData(mockData);
  }, []);

  useEffect(() => {
    // 이 부분에서 차트를 그립니다.
    questionData.forEach((question) => {
      if (question.type === 'checkbox' || question.type === 'radio') {
        const ctx = document.getElementById(`myChart${question.id}`);
        if (ctx) {
          drawChart(ctx, question);
        }
      }
    });
  }, [questionData]);

  const drawChart = (ctx, question) => {
    if (ctx.chart) {
      ctx.chart.destroy();
    }

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: question.options.map(option => option.value),
        datasets: [{
          data: question.options.map(option => option.count),
          backgroundColor: [
            'rgba(255, 99, 132, 0.7)',
            'rgba(54, 162, 235, 0.7)',
            'rgba(255, 206, 86, 0.7)',
            'rgba(75, 192, 192, 0.7)',
          ],
        }],
      },
      options: {
        plugins: {
          legend: {
            display: false, 
          },
        },
      },
    });
  };

  return (
    <div className="exit-container">
      <Header />
      <div className="container">
        <Sidebar />
        <main>
          {questionData.map(question => (
            <div key={question.id}>
              <h2>{question.title}</h2>
              {question.type === 'checkbox' || question.type === 'radio' ? (
                <>
                  <canvas id={`myChart${question.id}`} width="400" height="400"></canvas>
                </>
              ) : (
                <>
                  <table className="answer-table">
                    <thead>
                      <tr>
                        <th>기안답</th>
                      </tr>
                    </thead>
                    <tbody>
                      {question.options.map(option => (
                        <tr>
                          <td>{option.value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </>
              )}
              <hr />
            </div>
          ))}
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default Result2;
