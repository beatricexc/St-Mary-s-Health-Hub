// src/components/BenefitsSection.jsx

import React, { useContext } from 'react';
import { Card, Row, Col, Typography } from 'antd';
import benefits from '../../data/benefits';
import { ThemeContext } from '../../context/ThemeProvider';

const { Title } = Typography;

export default function BenefitsSection() {
  const { isDarkMode } = useContext(ThemeContext);

  // Keep yellow on light; use your app’s dark page background on dark
  const sectionBg = isDarkMode ? '#0F082C' : '#FAEDB5';

  // Reuse your theme tokens for cards and text
  const themeSettings = {
    dark: {
      text: '#F5F5FF',
      cardBg: '#1A103D',
      shadow: '0 8px 24px rgba(167, 139, 250, 0.12)',
      secondaryText: 'rgba(245,245,255,0.7)'
    },
    light: {
      text: '#2D3436',
      cardBg: '#FFFFFF',
      shadow: '0 8px 24px rgba(54, 162, 235, 0.12)',
      secondaryText: '#666'
    }
  };
  const current = isDarkMode ? themeSettings.dark : themeSettings.light;

  return (
    <section
      style={{
        background: sectionBg,
        padding: '60px 24px',
        transition: 'background 0.3s ease'
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <Title
          level={2}
          style={{
            textAlign: 'center',
            marginBottom: 48,
            color: current.text
          }}
        >
          Why Join Our Health Hub
        </Title>

        <Row gutter={[24, 24]}>
          {benefits.map((benefit, i) => {
            const Icon = benefit.icon;
            return (
              <Col key={i} xs={24} md={8}>
                <Card
                  variant="borderless"
                  bodyStyle={{
                    backgroundColor: current.cardBg,
                    padding: 24
                  }}
                  style={{
                    boxShadow: current.shadow,
                    borderRadius: 12,
                    height: '100%'
                  }}
                  hoverable
                  cover={
                    <img
                      src={benefit.image}
                      alt={benefit.title}
                      style={{
                        height: 200,
                        width: '100%',
                        objectFit: 'cover',
                        backgroundColor: current.cardBg
                      }}
                    />
                  }
                >
                  <Card.Meta
                    avatar={
                      <Icon
                        style={{
                          fontSize: benefit.iconSize,
                          color: current.text
                        }}
                      />
                    }
                    title={
                      <span style={{ color: current.text }}>
                        {benefit.title}
                      </span>
                    }
                    description={
                      <span style={{ color: current.secondaryText }}>
                        {benefit.description}
                      </span>
                    }
                  />
                </Card>
              </Col>
            );
          })}
        </Row>
      </div>
    </section>
  );
}
