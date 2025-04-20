// src/components/NavBar.jsx
import { useContext } from 'react';
import { Layout, Space, Button, Image, Typography, Switch } from 'antd';
import { Link } from 'react-router-dom';
import { LoginOutlined, UserAddOutlined, MoonFilled, SunFilled } from '@ant-design/icons';
import { ThemeContext } from '../context/ThemeProvider';
import logoDay from '../assets/logo_day.png';
import logoNight from '../assets/logo_night_v1.png';

const { Header } = Layout;
const { Title } = Typography;

function NavBar() {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <Header style={{ 
      background: isDarkMode ? '#0F082C' : '#fff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 24px',
      height: '100px', // Fixed header height
      borderBottom: isDarkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.1)',
    }}>
      <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
        <Image 
          src={isDarkMode ? logoNight : logoDay}
          preview={false}
          width={100}
          style={{ marginRight: 12 }}
        />
        <Title level={4} style={{ margin: 0, color: isDarkMode ? '#FFDC7A' : '#2D3436' }}>
          HealthHub
        </Title>
      </Link>
      <Space size="middle">
        <Switch
          checked={isDarkMode}
          onChange={toggleTheme}
          checkedChildren={<MoonFilled style={{ color: '#FFDC7A' }} />}
          unCheckedChildren={<SunFilled style={{ color: '#ffb655' }} />}
          style={{
            background: isDarkMode ? '#A78BFA' : '#B4E1FF',
            minWidth: '50px',
            ':hover': {
              background: isDarkMode ? '#B399FF' : '#9BD4FF'
            }
          }}
        />
        <Button 
          size="middle"
          type="text"
          icon={<LoginOutlined />}
          style={{
            height: 32, 
            padding: '0 15px',
            color: isDarkMode ? '#8C6BEC' : '#284497',
            border: isDarkMode ? '1px solid #8C6BEC' : 'none'
          }}
        >
          <Link to="/login">Login</Link>
        </Button>
        <Button 
          size="middle" 
          type="primary"
          icon={<UserAddOutlined />}
          style={{
            height: 32, 
            padding: '0 15px',
            background: isDarkMode ? '#8C6BEC' : '#284497',
            ':hover': {
              background: isDarkMode ? '#B399FF' : '#9BD4FF'
            }
          }}
        >
          <Link to="/signup">Sign Up</Link>
        </Button>
      </Space>
    </Header>
  );
}

export default NavBar;