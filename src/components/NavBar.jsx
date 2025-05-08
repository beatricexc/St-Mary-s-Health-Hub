// src/components/NavBar.jsx

import React, { useContext } from 'react';
import { Layout, Space, Button, Image, Switch } from 'antd';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  LoginOutlined,
  UserAddOutlined,
  LogoutOutlined,
  MoonFilled,
  SunFilled
} from '@ant-design/icons';
import { ThemeContext } from '../context/ThemeProvider';
import { AuthContext } from '../context/AuthProvider';
import logoDay from '../assets/logo_day.png';
import logoNight from '../assets/logo_night_v1.png';

const { Header } = Layout;

export default function NavBar() {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const { isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const onDashboard = location.pathname === '/dashboard';

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <Header
      style={{
        background: isDarkMode ? '#0F082C' : '#FFFFFF',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 24px',
        height: 100,
        borderBottom: isDarkMode
          ? '1px solid rgba(255,255,255,0.1)'
          : '1px solid rgba(0,0,0,0.1)',
      }}
    >
      {/* Logo + Title */}
      <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
        <Image
          src={isDarkMode ? logoNight : logoDay}
          preview={false}
          width={100}
          style={{ marginRight: 12 }}
        />
        <span style={{
          fontSize: '1.5rem',
          fontWeight: 500,
          color: isDarkMode ? '#FFDC7A' : '#2D3436'
        }}>
          HealthHub
        </span>
      </Link>

      <Space size="middle" align="center">
        {/* Theme Toggle */}
        <Switch
          checked={isDarkMode}
          onChange={toggleTheme}
          checkedChildren={<MoonFilled style={{ color: '#FFDC7A' }} />}
          unCheckedChildren={<SunFilled style={{ color: '#ffb655' }} />}
          style={{
            background: isDarkMode ? '#A78BFA' : '#B4E1FF',
            minWidth: 50,
          }}
        />

        {/* On dashboard + authenticated: show only Logout */}
        {onDashboard && isAuthenticated ? (
          <Button
            type="text"
            icon={<LogoutOutlined />}
            onClick={handleLogout}
            style={{
              height: 32,
              padding: '0 15px',
              color: isDarkMode ? '#8C6BEC' : '#284497',
              border: isDarkMode ? '1px solid #8C6BEC' : 'none',
            }}
          >
            Logout
          </Button>
        ) : (
          /* Everywhere else: always show Login & Sign Up */
          <>
            <Button
              type="text"
              icon={<LoginOutlined />}
              style={{
                height: 32,
                padding: '0 15px',
                color: isDarkMode ? '#8C6BEC' : '#284497',
                border: isDarkMode ? '1px solid #8C6BEC' : 'none',
              }}
            >
              <Link to="/login">Login</Link>
            </Button>
            <Button
              type="primary"
              icon={<UserAddOutlined />}
              style={{
                height: 32,
                padding: '0 15px',
                background: isDarkMode ? '#8C6BEC' : '#284497',
                border: 'none',
              }}
            >
              <Link to="/signup">Sign Up</Link>
            </Button>
          </>
        )}
      </Space>
    </Header>
  );
}
