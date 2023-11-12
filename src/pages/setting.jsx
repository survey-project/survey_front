import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../style/setting.css';
import Header from '../components/header';
import Sidebar from '../components/sidebar';
import Footer from '../components/footer';

function Setting () {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // 회원 목록 조회
    axios.get('/api/users')
      .then(response => setUsers(response.data.users))
      .catch(error => console.error('회원 목록을 불러오는 중 오류 발생:', error));

    // 게시글 목록 조회
    axios.get('/api/posts')
      .then(response => setPosts(response.data.posts))
      .catch(error => console.error('게시글 목록을 불러오는 중 오류 발생:', error));
  }, []);

  const handleDeletePost = async (postId) => {
    try {
      // 게시글 삭제 요청
      const response = await axios.delete(`/api/posts/${postId}`);

      if (response.status === 200) {
        // 삭제 성공 시 해당 게시물을 목록에서 제거
        setPosts(posts.filter(post => post.id !== postId));
        alert('게시글이 성공적으로 삭제되었습니다.');
      } else {
        alert('게시글 삭제 중 오류가 발생했습니다.');
      }
    } catch (error) {
      console.error('게시글 삭제 중 오류 발생:', error);
      alert('게시글 삭제 중 예기치 않은 오류가 발생했습니다.');
    }
  };

  return (
    <div className="setting-container">
      <Header />
      <div className="container">
        <Sidebar />
        <main>
        <div>
      <table className="table1">
        <caption>회원관리</caption>
        <thead>
          <tr>
            <th scope="col">아이디</th>
            <th scope="col">닉네임</th>
            <th scope="col">가입날짜</th>
            <th scope="col">참여도</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.nickname}</td>
              <td>{user.joinDate}</td>
              <td>{user.participation}</td>
              </tr>
              ))}
        </tbody>
      </table>
      <table className="table2">
        <caption>게시글 관리</caption>
          <thead>
            <tr>
              <th scope="col">글제목</th>
              <th scope="col">작성자</th>
              <th scope="col">게시일</th>
              <th scope="col">결과보기</th>
              <th scope="col">삭제</th>
            </tr>
          </thead>
          <tbody>
            {posts.map(post => (
              <tr key={post.id}>
                <td>{post.title}</td>
                <td>{post.author}</td>
                <td>{post.date}</td>
                <td className="color">
                  <button>결과보기</button>
                </td>
                <td className="color">
                  <button onClick={() => handleDeletePost(post.id)}>삭제</button>
                </td>
              </tr>
            ))}
          </tbody>
      </table>
    </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Setting;

//페이지네이션 해야될까요..?
//결과보기 버튼 누르면 해당 answersurvey 페이지로 이동해야함..