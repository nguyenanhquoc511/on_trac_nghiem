import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Dropdown, Menu, Space } from 'antd';
import { useAuthContext } from '../context/auth_context';

const menu = (
  <Menu
    items={[
      {
        key: '1',
        label: (
          <Link className="blog-link" to="/blog-list">
            Xem khóa học
          </Link>
        )
      },
      {
        key: '2',
        label: (
          <Link className="blog-link" to="/post">
            Bài giảng
          </Link>
        )
      }
    ]}
  />
);

const Header = () => {
  const { role, logoutHandler } = useAuthContext();

  return (
    <header>
      <Link to="/" className="logo">
        {/* <span style={{ color: '#51a8ff', fontSize: '2rem' }}>OFFICE INFORMATION </span>
        <span style={{ color: '#51a8ff', display: 'block', fontSize: '2rem' }}>
          Practice & Preparation Tests
        </span> */}
        <span style={{ color: '#51a8ff'}}>OFFICE INFORMATION Practice & Preparation Tests</span>
      </Link>

      <div id="menu" className="fas fa-bars"></div>

      <nav className="navbar" style={{ display: 'flex' }}>
        <Link to="/" style={{ marginTop: '0' }}>
          Trang chủ
        </Link>
        <Link to="/practice" style={{ marginTop: '0' }}>
          Luyện đề
        </Link>
        <Dropdown overlay={menu}>
          <div onClick={(e) => e.preventDefault()}>
            <Space style={{ fontSize: '20px', marginTop: '0', marginLeft: '13px' }}>Khóa học</Space>
          </div>
        </Dropdown>

        {role && (
          <Link to="/exam" style={{ marginTop: '0' }}>
            Thi thử
          </Link>
        )}

        {/* {role === 'admin' && (
          <Link to="/admin/create-question" style={{ marginTop: '0' }}>
            Admin
          </Link>
        )} */}

        {/* {role === 'user' && (
          <Link to="/profile" style={{ marginTop: '0' }}>
            Trang cá nhân
          </Link>
        )} */}

        {!role && (
          <Link to="/login" style={{ color: '#51a8ff', marginTop: '0' }}>
            Đăng nhập
          </Link>
        )}

        {role && (
          <Link to="/" style={{ color: '#51a8ff', marginTop: '0' }} onClick={logoutHandler}>
            Đăng xuất
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Header;
