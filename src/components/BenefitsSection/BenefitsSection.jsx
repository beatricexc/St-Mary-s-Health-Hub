import React from 'react';
import { Card, Row, Col, Typography } from 'antd';
import benefits from '../../data/benefits';

const { Title } = Typography;

export default function BenefitsSection({ isDarkMode }) {
  return (
    <section style={{ 
      background: isDarkMode ? '#51258f' : '#faedb5', 
      padding: '60px 24px'
    }}>
      <Title level={2} style={{ 
        textAlign: 'center', 
        marginBottom: 48,
        color: isDarkMode ? '#fff' : '#000'
      }}>
        Why Join Our Health Hub
      </Title>
      <Row gutter={[24, 24]}>
        {benefits.map((benefit, index) => {
          const Icon = benefit.icon; 
          return (
            <Col key={index} xs={24} md={8}>
              <Card
                cover={
                  <img 
                    src={benefit.image} 
                    alt={benefit.title} 
                    style={{ 
                      height: 200, 
                      objectFit: 'cover',
                      backgroundColor: isDarkMode ? '#333' : '#f5f5f5'
                    }}
                  />
                }
                style={{ 
                  background: isDarkMode ? '#1a2035' : '#fff',
                  height: '100%'
                }}
                hoverable
              >
                <Card.Meta
                  avatar={<Icon style={{ fontSize: benefit.iconSize }} />}
                  title={<span style={{ color: isDarkMode ? '#fff' : '#000' }}>{benefit.title}</span>}
                  description={<span style={{ color: isDarkMode ? '#ccc' : '#666' }}>{benefit.description}</span>}
                />
              </Card>
            </Col>
          );
        })}
      </Row>
    </section>
  );
}