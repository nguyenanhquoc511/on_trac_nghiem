import React from 'react';
import { BrowserRouter as Router, Switch, Route, Navigate } from 'react-router-dom';

import Header from './components/Header';
import HomePage from './pages/HomePage';
import PracticePage from './pages/PracticePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import PracticeDetailPage from './pages/PracticeDetailPage';
import NotFoundPage from './pages/NotFoundPage';
import SolutionPage from './pages/SolutionPage';
import ExamPage from './pages/ExamPage';
import CreateQuestionPage from './pages/admin-page/CreateQuestionPage/CreateQuestionPage';
import CreateTestPage from './pages/admin-page/CreateTestPage/CreateTestPage';
import QuestionList from './pages/admin-page/QuestionListPage/QuestionList';
import TestListPage from './pages/admin-page/TestListPage/TestListPage';
import ExamDetailPage from './pages/ExamDetailPage';
import ProfilePage from './pages/ProfilePage';
import BlogDetail from './pages/blog/BlogDetail';
import BlogPost from './pages/blog/BlogPost';
import BlogList from './pages/blog/BlogList';

import 'antd/dist/antd.css';

function App() {
  return (
    <Router>
      <div className="container">
        <Header />
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route exact path="/practice">
            <PracticePage />
          </Route>
          <Route exact path="/post">
            <BlogPost />
          </Route>
          <Route exact path="/blog-list">
            <BlogList />
          </Route>
          <Route exact path="/blog-detail/:id">
            <BlogDetail />
          </Route>
          <Route exact path="/practice/:id">
            <PracticeDetailPage />
          </Route>
          <Route exact path="/exam">
            <ExamPage />
          </Route>
          <Route exact path="/exam/:id">
            <ExamDetailPage />
          </Route>
          <Route exact path="/solution/:id">
            <SolutionPage />
          </Route>
          <Route exact path="/login">
            <LoginPage />
          </Route>
          <Route exact path="/register">
            <RegisterPage />
          </Route>
          <Route exact path="/profile">
            <ProfilePage />
          </Route>
          <Route exact path="/admin/create-question">
            <CreateQuestionPage />
          </Route>
          <Route exact path="/admin/create-test">
            <CreateTestPage />
          </Route>
          <Route exact path="/admin/question-list">
            <QuestionList />
          </Route>
          <Route exact path="/admin/test-list">
            <TestListPage />
          </Route>
          <Route exact path="*">
            <NotFoundPage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
