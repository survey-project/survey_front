import React from 'react';
import './App.css';
import { Routes, Route, BrowserRouter } from "react-router-dom";

import Exit from './pages/exit'; 
import Mainbefore from './pages/mainbefore';
import Mainafter from './pages/mainafter';
import Login from './pages/login';
import Mypage from './pages/mypage';
import Setting from './pages/setting';
import AnswerSurvey from './pages/answer';
import MakeSurvey from './pages/make';
import Result1 from './pages/result1';
import Result2 from './pages/result2';
import Mysurvey from './pages/mysurvey';

function App () {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Mainbefore />} />
        <Route path="/mainafter" element={<Mainafter />}/>
        <Route path="/exit" element={<Exit />} />
        <Route path="/login" element={<Login />} />
        <Route path="/mypage" element={<Mypage />}/>
        <Route expact path="/setting" element={<Setting />} />
        <Route path="/answersurvey" element={<AnswerSurvey />} />
        <Route path="/make" element={<MakeSurvey />} />
        <Route path="/result1" element={<Result1 />} />
        <Route path="/result2" element={<Result2 />} />
        <Route path="/mysurvey" element={<Mysurvey/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;