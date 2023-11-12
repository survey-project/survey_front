import React, { useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../style/mainafter.css';
import Header from '../components/header';
import Sidebar from '../components/sidebar';
import Footer from '../components/footer';

function Mainafter () {
    //toggle 열고 닫기
    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };
    
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [tableData, setTableData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10); // 페이지당 아이템 수

    // 페이지 변경 핸들러
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // 페이징 계산
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = tableData.slice(indexOfFirstItem, indexOfLastItem);

    // 페이지 번호 생성
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(tableData.length / itemsPerPage); i++) {
        pageNumbers.push(i);
    }
    
    useEffect(() => {
        // 임시 데이터(테스트용)
        const tempData = [
          { id: 1, title: 'Task 1', deadline: '2023-11-30' },
          { id: 2, title: 'Task 2', deadline: '2023-11-10' },
        ];
    
        setTableData(tempData);
      }, []);
      /*
      useEffect(() => {
    axios.get('/api/data') // 예시: 실제 API 엔드포인트로 변경해야 합니다.
      .then((response) => {
        const sortedData = response.data; // 백엔드에서 정렬된 데이터를 받아옴
        setTableData(sortedData);
      })
      .catch((error) => {
        console.error('데이터를 불러오는 중 오류 발생:', error);
      });
  }, []);  
      */
    return (
      <div className = "main-container">
        <Header /> 
        <div className= "container">
            <Sidebar />
            <main>
            <div id="main-sort">
                <button id="dropdownButton" onClick={toggleDropdown}>정렬 옵션</button>
                {isDropdownOpen &&(
                <div id="sortMenu">
                <ul>
                    <li data-sort-option="pro" selected>진행중</li>
                    <li data-sort-option="new">최신순</li>
                    <li data-sort-option="end">마감순</li>
                </ul>
                </div>
            )}
            </div>
            <table className="table">
                <thead>
                <tr>
                    <th scope="col">목록</th>
                    <th scope="col">제목</th>
                    <th scope="col">마감일</th>
                    <th scope="col">응답하기</th>
                </tr>
                </thead>
                <tbody>
                {currentItems.map((item) => (
                <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.title}</td>
                    <td>{item.deadline}</td>
                    <td className="color">
                        <Link to={'/answersurvey/${item.id}'}>
                            <button>응답</button>
                        </Link>
                    </td>
                </tr>
                 ))}
                </tbody>
            </table>
            <div id="pagination">
                <button
                    id="previousPage"
                    onClick={() =>
                    currentPage > 1 && handlePageChange(currentPage - 1)
                    }
                >
                    이전
                </button>
                <div id="pageNumbers">
                    {pageNumbers.map((number) => (
                    <button
                        key={number}
                        id={`page${number}`}
                        className={currentPage === number ? 'selected-page' : ''}
                        onClick={() => handlePageChange(number)}
                    >
                        {number}
                    </button>
                    ))}
                </div>
                <button
                    id="nextPage"
                    onClick={() =>
                    currentPage < pageNumbers.length &&
                    handlePageChange(currentPage + 1)
                    }>
                    다음
                </button>
            </div>
            </main>
        </div>
        <Footer />
      </div>
    );
  };
  
export default Mainafter;
//응답 버튼 누르면 answersurvey 페이지로 이동해야함(단, id 값에 맞는 페이지로)