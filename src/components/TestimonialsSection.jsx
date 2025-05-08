// src/components/TestimonialsSection.jsx

import React, { useContext } from 'react';
import { Card, Row, Col, Avatar, Typography } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import testimonials from '../data/testimonials';
import { ThemeContext } from '../context/ThemeProvider';

const { Title } = Typography;

export default function TestimonialsSection() {
  const { isDarkMode } = useContext(ThemeContext);

  const themeSettings = {
    dark: {
      text: '#F5F5FF',
      cardBg: '#1A103D',
      shadow: '0 8px 24px rgba(167, 139, 250, 0.12)',
      sectionBg: '#0F082C'
    },
    light: {
      text: '#2D3436',
      cardBg: '#FFFFFF',
      shadow: '0 8px 24px rgba(54, 162, 235, 0.12)',
      sectionBg: '#f9f9f9'
    }
  };
  const current = isDarkMode ? themeSettings.dark : themeSettings.light;

  return (
    <section
      style={{
        padding: '60px 24px',
        background: current.sectionBg,
        transition: 'background 0.3s ease'
      }}
    >
      <Title
        level={2}
        style={{
          textAlign: 'center',
          marginBottom: 48,
          color: current.text
        }}
      >
        What St Mary's Community Says
      </Title>

      <Row gutter={[24, 24]}>
        {testimonials.map((t, i) => (
          <Col key={i} xs={24} md={8}>
            <Card
              variant="borderless"
              bodyStyle={{
                backgroundColor: current.cardBg,
                padding: '24px'
              }}
              style={{
                boxShadow: current.shadow,
                borderRadius: 12,
                height: '100%'
              }}
              hoverable
            >
              <p
                style={{
                  color: current.text,
                  fontStyle: 'italic',
                  fontSize: 16
                }}
              >
                "{t.quote}"
              </p>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginTop: 16
                }}
              >
                <Avatar
                  src={t.avatar}
                  icon={<UserOutlined />}
                  style={{
                    backgroundColor: isDarkMode ? '#333' : undefined
                  }}
                />
                <div style={{ marginLeft: 12 }}>
                  <p
                    style={{
                      margin: 0,
                      color: current.text,
                      fontWeight: 'bold'
                    }}
                  >
                    {t.name}
                  </p>
                  <p
                    style={{
                      margin: 0,
                      color: isDarkMode ? 'rgba(245,245,255,0.7)' : 'rgba(45,52,54,0.7)'
                    }}
                  >
                    {t.role}
                  </p>
                </div>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </section>
  );
}
