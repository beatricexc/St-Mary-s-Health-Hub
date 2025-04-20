import React, { useContext } from 'react';
import { Typography, Button, Space, ConfigProvider, theme } from 'antd';
import HeroSection from '../components/HeroSection/HeroSection';
import { ThemeContext } from '../context/ThemeProvider';
import BMICalculator from '../components/BMICalculator/BMICalculator';
import BenefitsSection from '../components/BenefitsSection/BenefitsSection';
import TestimonialsSection from '../components/TestimonialsSection';
import WaterTracker from '../components/WaterTracker';
import MealCard from '../components/MealGenerator/MealCard';

const { Title, Paragraph } = Typography;

export default function HomePage() {
  const themeContext = useContext(ThemeContext);
  
  // Debugging logs
  React.useEffect(() => {
    console.log('ThemeContext value:', themeContext);
    if (!themeContext) {
      console.error('ThemeContext is undefined!');
    }
  }, [themeContext]);

  if (!themeContext) {
    return (
      <div style={{ padding: 20, color: 'red' }}>
        Error: ThemeContext not available. Check your ThemeProvider setup.
      </div>
    );
  }

  const { isDarkMode } = themeContext;

  return (
    <ConfigProvider
      theme={{
        algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
      }}
    >
      <div style={{ 
        maxWidth: 1200, 
        margin: '0 auto', 
        paddingBottom: 40,
        background: isDarkMode ? '#0F082C' : '#FFFFFF',
        minHeight: '100vh'
      }}>
        {/* Debug overlay */}
        <div style={{
          position: 'fixed',
          top: 10,
          right: 10,
          background: isDarkMode ? '#51258f' : '#faedb5',
          color: isDarkMode ? '#FFF' : '#000',
          padding: 10,
          zIndex: 9999,
          border: '1px solid'
        }}>
          
        </div>

        <HeroSection />
        <BenefitsSection />
        <BMICalculator />
        <TestimonialsSection />
        <WaterTracker />
        <MealCard/>
        
        <section style={{ padding: '60px 24px', textAlign: 'center' }}>
          <Title level={2} style={{ marginBottom: 16, color: isDarkMode ? '#F5F5FF' : '#2D3436' }}>
            Ready to Take Control of Your Health?
          </Title>
          <Paragraph style={{ 
            fontSize: 16, 
            marginBottom: 32, 
            maxWidth: 600, 
            marginLeft: 'auto', 
            marginRight: 'auto',
            color: isDarkMode ? '#F5F5FF' : '#2D3436'
          }}>
            Join hundreds of students and staff already improving their wellbeing.
          </Paragraph>
          <Space size="large">
            <Button type="primary" size="large" href="/register">
              Sign Up Now
            </Button>
            <Button size="large" href="/login">
              Login
            </Button>
          </Space>
        </section>
      </div>
    </ConfigProvider>
  );
}