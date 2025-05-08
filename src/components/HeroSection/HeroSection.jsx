import React, { useContext } from 'react';
import { Button, Typography, Row, Col } from 'antd';
import { ThemeContext } from '../../context/ThemeProvider';
import heroImageLight from '../../assets/hero_image.jpg';
import heroImageDark from '../../assets/test_dark_image.png';
import { useNavigate, Link } from 'react-router-dom';



const { Title, Paragraph } = Typography;

export default function HeroSection() {
  const { isDarkMode } = useContext(ThemeContext);
  const navigate = useNavigate();

  return (
    <Row
      align="middle"
      style={{
        minHeight: '60vh',
        padding: '40px 24px',
        backgroundColor: isDarkMode ? '#0F082C' : '#FFFFFF',
        transition: 'background-color 0.3s ease'
      }}
    >
      {/* Text Column - Left on desktop, bottom on mobile */}
      <Col
        xs={24}
        md={12}
        style={{
          textAlign: 'center',
          padding: '0 16px',
          marginBottom: '32px',
          '@media (min-width: 768px)': {
            textAlign: 'left',
            padding: '0 24px',
            marginBottom: 0
          }
        }}
      >
        <Title
          level={1}
          style={{
            fontSize: '2.5rem',
            lineHeight: 1.2,
            marginBottom: '16px',
            color: isDarkMode ? '#ffdc7a' : '#2D3436'
          }}
        >
          Take Control of <span style={{ color: isDarkMode ? '#A78BFA' : '#284497' }}>Your Health</span>
        </Title>

        <Paragraph
          style={{
            fontSize: '1.1rem',
            marginBottom: '24px',
            maxWidth: '500px',
            marginLeft: 'auto',
            marginRight: 'auto',
            color: isDarkMode ? '#E2E8F0' : '#64748B',
            '@media (min-width: 768px)': {
              marginLeft: 0,
              marginRight: 0
            }
          }}
        >
          Personalized tools to track and improve your wellness journey.
        </Paragraph>

        <Button
          type="primary"
          size="large"
          onClick={() => navigate('/login')}
          style={{
            background: isDarkMode ? '#A78BFA' : '#284497',
            border: 'none',
            padding: '0 32px',
            height: '48px',
            ':hover': {
              background: isDarkMode ? '#B399FF' : '#3A56C7'
            }
          }}
        >
          Get Started
        </Button>
      </Col>

      {/* Image Column - Right on desktop, top on mobile */}
      <Col
        xs={24}
        md={12}
        style={{
          textAlign: 'center',
          padding: '0 16px',
          '@media (min-width: 768px)': {
            padding: '0 24px',
            textAlign: 'right'
          }
        }}
      >
        <img
          src={isDarkMode ? heroImageDark : heroImageLight}
          alt="Health tracking app"
          style={{
            maxWidth: '100%',
            maxHeight: '400px',
            borderRadius: 8,
            objectFit: 'contain'
          }}
        />
      </Col>
    </Row>
  );
}