// src/pages/DashboardPage.jsx

import React from 'react';
import { Layout, Row, Col, Space, Typography } from 'antd';
import WaterTracker from '../components/WaterTracker/WaterTracker';
import MealGenerator from '../components/MealGenerator/MealGenerator';
import SymptomChecker from '../components/SymptomChecker/SymptomChecker';
import AnxietyTips from '../components/AnxietyTips/AnxietyTips';
import DailyAffirmations from '../components/DailyAffirmations/DailyAffirmations';

const { Content } = Layout;
const { Title, Paragraph } = Typography;

export default function DashboardPage() {
  return (
    <Layout style={{ minHeight: '100vh', background: 'transparent' }}>
      <Content
        style={{
          padding: 24,
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <div style={{ maxWidth: 1200, width: '100%' }}>
          {/* Vertical spacing between sections */}
          <Space direction="vertical" size={32} style={{ width: '100%' }}>

            {/* Section 1: Daily Trackers */}
            <section>
              <Title level={3}>Daily Trackers</Title>
              <Paragraph>
                Keep tabs on your hydration and meal planning with these quick tools.
              </Paragraph>
              <Row gutter={[24, 24]}>
                <Col xs={24} md={12}>
                  <WaterTracker />
                </Col>
                <Col xs={24} md={12}>
                  <MealGenerator />
                </Col>
              </Row>
            </section>

            {/* Section 2: Symptom Checker */}
            <section>
              <Title level={3}>Symptom Checker</Title>
              <Paragraph>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
                accumsan, metus ultrices eleifend gravida, nulla nunc varius
                lectus, nec rutrum justo nibh eu lectus. Ut vulputate semper dui.
                Fusce erat odio, sollicitudin vel erat vel, interdum mattis neque.
              </Paragraph>
              <Paragraph>
                Curabitur dapibus nisi id nibh tempor, eget lobortis purus
                vehicula. Aliquam erat volutpat. Sed imperdiet ante a urna
                fermentum, at condimentum metus mattis.
              </Paragraph>
              <SymptomChecker />
            </section>

            {/* Section 3: Tips & Affirmations */}
            <section>
              <Title level={3}>Well-Being Boosters</Title>
              <Paragraph>
                Mix of practical tips and positive affirmations to help keep
                you motivated and calm during intense study sessions.
              </Paragraph>
              <Row gutter={[24, 24]}>
                <Col xs={24} md={12}>
                  <AnxietyTips />
                </Col>
                <Col xs={24} md={12}>
                  <DailyAffirmations />
                </Col>
              </Row>
            </section>

          </Space>
        </div>
      </Content>
    </Layout>
  );
}







