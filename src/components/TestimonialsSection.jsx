import React from 'react';
import { Card, Row, Col, Avatar, Typography } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import testimonials from '../data/testimonials';

const { Title } = Typography;

export default function TestimonialsSection({ isDarkMode }) {
  return (
    <section style={{ 
      padding: '60px 24px', 
      background: isDarkMode ? '#1a1a1a' : '#f9f9f9'
    }}>
      <Title 
        level={2} 
        style={{ 
          textAlign: 'center', 
          marginBottom: 48,
          color: isDarkMode ? '#fff' : '#000'
        }}
      >
        What St Mary's Community Says
      </Title>
      
      <Row gutter={[24, 24]}>
        {testimonials.map((testimonial, index) => (
          <Col key={index} xs={24} md={8}>
            <Card 
              style={{ 
                background: isDarkMode ? '#242c47' : '#fff',
                height: '100%'
              }}
              hoverable
            >
              <p style={{ 
                color: isDarkMode ? '#eee' : '#333', 
                fontStyle: 'italic',
                fontSize: 16
              }}>
                "{testimonial.quote}"
              </p>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                marginTop: 16 
              }}>
                <Avatar 
                  src={testimonial.avatar} 
                  icon={<UserOutlined />} 
                />
                <div style={{ marginLeft: 12 }}>
                  <p style={{ 
                    margin: 0, 
                    color: isDarkMode ? '#fff' : '#000',
                    fontWeight: 'bold'
                  }}>
                    {testimonial.name}
                  </p>
                  <p style={{ 
                    margin: 0, 
                    color: isDarkMode ? '#aaa' : '#666' 
                  }}>
                    {testimonial.role}
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