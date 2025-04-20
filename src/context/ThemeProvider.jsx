import { createContext, useState, useEffect } from 'react';
import { ConfigProvider, theme } from 'antd';

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  // Apply dark mode to entire page
  useEffect(() => {
    document.body.style.background = isDarkMode ? '#0F082C' : '#FFFFFF';
    document.body.style.color = isDarkMode ? '#F5F5FF' : '#2D3436';
  }, [isDarkMode]);

  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem('theme', newMode ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      <ConfigProvider
        theme={{
          algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
          token: {
            colorPrimary: isDarkMode ? '#A78BFA' : '#284497',
            colorBgContainer: isDarkMode ? '#0F082C' : '#FFFFFF',
            colorText: isDarkMode ? '#F5F5FF' : '#2D3436',
          },
          components: {
            Switch: {
              colorPrimary: isDarkMode ? '#A78BFA' : '#284497',
              trackHeight: 24,  
              trackMinWidth: 44, 
              handleSize: 20,   
              handleBg: '#FFFFFF', 
            }
          }
        }}
      >
        {children}
      </ConfigProvider>
    </ThemeContext.Provider>
  );
}