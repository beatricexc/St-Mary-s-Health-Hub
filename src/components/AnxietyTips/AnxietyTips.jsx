// src/components/AnxietyTips.jsx
import React, { useContext, useState } from 'react';
import { Card, List, Typography } from 'antd';
import { BulbOutlined } from '@ant-design/icons';
import { ThemeContext } from '../../context/ThemeProvider';
import anxietyTips from '../../data/anxietyTips'

const { Text } = Typography;

export default function AnxietyTips() {
    const { isDarkMode } = useContext(ThemeContext);
    const [hoveredIndex, setHoveredIndex] = useState(null);

    // Hover background: pale yellow in light mode, pale purple in dark mode
    const hoverBg = isDarkMode
        ? 'rgba(167, 139, 250, 0.2)'
        : 'rgba(255, 220, 122, 0.2)';

    // Theme tokens mirroring WaterTracker
    const themeSettings = {
        dark: {
            text: '#F5F5FF',
            cardBg: '#1A103D',
            shadow: '0 8px 24px rgba(167, 139, 250, 0.12)'
        },
        light: {
            text: '#2D3436',
            cardBg: '#FFFFFF',
            shadow: '0 8px 24px rgba(54, 162, 235, 0.12)'
        }
    };
    const currentTheme = isDarkMode ? themeSettings.dark : themeSettings.light;

    return (
        <Card
            title="Anxiety Management Tips"
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
                    backgroundColor: currentTheme.cardBg
                }
            }}
            style={{
                backgroundColor: currentTheme.cardBg,
                boxShadow: currentTheme.shadow,
                borderRadius: 12,
                overflow: 'hidden',
                margin: 0
            }}>
            <List
                dataSource={anxietyTips}
                renderItem={(tip, index) => {
                    const isHovered = hoveredIndex === index;
                    const bg = isHovered ? hoverBg : 'transparent';

                    return (
                        <List.Item
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                            style={{
                                display: 'flex',
                                alignItems: 'flex-start',           // top-align icon & text
                                backgroundColor: bg,
                                borderRadius: 8,
                                padding: '20px',
                                transition: 'background-color 0.2s ease'
                            }}
                        >
                            <BulbOutlined
                                style={{
                                    fontSize: 20,
                                    marginRight: 12,
                                    color: currentTheme.text
                                }}
                            />
                            {/* flex:1 ensures multi-line text wraps under first line, not under the icon */}
                            <div style={{ flex: 1 }}>
                                <Text style={{ color: currentTheme.text, display: 'block' }}>
                                    {tip}
                                </Text>
                            </div>
                        </List.Item>
                    );
                }}
            />
        </Card>
    );
}
