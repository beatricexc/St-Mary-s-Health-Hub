import React, { useState, useEffect, useContext } from 'react';
import { Button, Card, Progress } from 'antd';
import { PlusOutlined, UndoOutlined } from '@ant-design/icons';
import { ThemeContext } from '../../context/ThemeProvider';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Notification from './Notification';

const WaterTracker = () => {
  const { isDarkMode } = useContext(ThemeContext);
  const [glasses, setGlasses] = useState(0);
  const goal = 8;

  const REMINDER_INTERVAL = 2000; // 2 hours

  // Reminder system
  useEffect(() => {
    const reminderTimer = setInterval(() => {
      if (glasses < goal) {
        // Show toast notification
        toast.info(
          <Notification />,
          {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            theme: isDarkMode ? 'dark' : 'light',
            toastId: 'water-reminder',
            icon: false // Disable default icon
          }
        )
      }
    }, REMINDER_INTERVAL);
    return () => clearInterval(reminderTimer);
  }, [glasses, isDarkMode]);


  const themeSettings = {
    dark: {
      text: '#F5F5FF',
      cardBg: '#1A103D',
      progress: '#20DBAE',
      primary: '#A78BFA',
      shadow: '0 8px 24px rgba(167, 139, 250, 0.12)'
    },
    light: {
      text: '#2D3436',
      cardBg: '#FFFFFF',
      progress: '#20DBAE',
      primary: '#284497',
      shadow: '0 8px 24px rgba(54, 162, 235, 0.12)'
    }
  };

  const currentTheme = isDarkMode ? themeSettings.dark : themeSettings.light;

  return (
    <>
      <Card
        title="Water Tracker"
        variant="borderless"
        styles={{
          header: {
            color: currentTheme.text,
            fontWeight: 500,
            textAlign: 'center',
            borderBottom: 'none',
            padding: '24px 24px 0'
          },
          body: {
            color: currentTheme.text,
            padding: '16px 24px 24px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: currentTheme.cardBg
          }
        }}
        style={{
          width: 320,
          margin: '20px auto',
          backgroundColor: currentTheme.cardBg,
          boxShadow: currentTheme.shadow,
          borderRadius: 12,
          overflow: 'hidden'
        }}
      >
        <p style={{
          marginBottom: 24,
          textAlign: 'center',
          color: isDarkMode ? 'rgba(245, 245, 255, 0.8)' : 'rgba(45, 52, 54, 0.8)'
        }}>
          Goal: {goal} glasses (~2L)
        </p>

        <div style={{
          margin: '0 auto',
          position: 'relative'
        }}>
          <Progress
            type="dashboard"
            percent={(glasses / goal) * 100}
            format={() => (
              <div style={{
                color: currentTheme.text,
                textAlign: 'center'
              }}>
                <div style={{ fontSize: 24, fontWeight: 500 }}>{glasses}</div>
                <div style={{
                  fontSize: 12,
                  color: isDarkMode ? 'rgba(245, 245, 255, 0.6)' : 'rgba(45, 52, 54, 0.6)'
                }}>
                  glasses
                </div>
              </div>
            )}
            strokeColor={currentTheme.progress}
            trailColor={isDarkMode ? 'rgba(245, 245, 255, 0.08)' : 'rgba(45, 52, 54, 0.08)'}
            size={150}
            strokeWidth={8}
          />
        </div>

        <div style={{
          margin: '24px 0',
          fontSize: 16,
          fontWeight: 500,
          textAlign: 'center'
        }}>
          {glasses}/{goal} glasses
        </div>

        <div style={{
          display: 'flex',
          gap: 12,
          width: '100%'
        }}>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setGlasses(prev => Math.min(prev + 1, goal))}
            style={{
              background: currentTheme.primary,
              border: 'none',
              height: 40,
              flex: 1,
              borderRadius: 8
            }}
          >
            Add Glass
          </Button>
          <Button
            icon={<UndoOutlined />}
            onClick={() => setGlasses(0)}
            style={{
              color: currentTheme.text,
              borderColor: isDarkMode ? 'rgba(245, 245, 255, 0.2)' : 'rgba(45, 52, 54, 0.2)',
              height: 40,
              flex: 1,
              borderRadius: 8
            }}
          >
            Reset
          </Button>
        </div>
      </Card>

      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={isDarkMode ? 'dark' : 'light'}
        toastStyle={{
          backgroundColor: isDarkMode ? '#1A103D' : '#FFFFFF',
          borderLeft: `4px solid ${isDarkMode ? '#A78BFA' : '#284497'}`,
          boxShadow: isDarkMode
            ? '0 4px 12px rgba(167, 139, 250, 0.25)'
            : '0 4px 12px rgba(40, 68, 151, 0.25)'
        }}
        progressStyle={{
          background: isDarkMode
            ? 'linear-gradient(to right, #A78BFA, #20DBAE)'
            : 'linear-gradient(to right, #284497, #36A2EB)'
        }}
      />
    </>
  );
};

export default WaterTracker;