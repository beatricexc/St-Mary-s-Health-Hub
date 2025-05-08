import React, { useContext, useState } from 'react';
import { Card, List, Typography } from 'antd';
import { ThemeContext } from '../../context/ThemeProvider';
import dailyAffirmations from '../../data/dailyAffirmations';

const { Text } = Typography;

export default function DailyAffirmations() {
    const { isDarkMode } = useContext(ThemeContext);
    const [hovered, setHovered] = useState(null);

    const hoverBg = isDarkMode
        ? 'rgba(39, 181, 194, 0.79)'
        : 'rgba(173, 216, 230, 0.2)';

    const themeSettings = {
        dark: { text: '#F5F5FF', cardBg: '#1A103D', shadow: '0 8px 24px rgba(167, 139, 250, 0.12)' },
        light: { text: '#2D3436', cardBg: '#FFFFFF', shadow: '0 8px 24px rgba(54, 162, 235, 0.12)' }
    };
    const current = isDarkMode ? themeSettings.dark : themeSettings.light;

    return (
        <Card
            title="Daily Affirmations"
            variant="borderless"
            styles={{
                header: {
                    color: current.text, fontWeight: 500,
                    textAlign: 'center', borderBottom: 'none',
                    padding: '24px 24px 0'
                },
                body: {
                    color: current.text,
                    padding: '16px 24px 24px',
                    backgroundColor: current.cardBg
                }
            }}
            style={{
                width: '100%', backgroundColor: current.cardBg,
                boxShadow: current.shadow, borderRadius: 12,
                overflow: 'hidden', margin: 0
            }}
        >
            <List
                dataSource={dailyAffirmations}
                renderItem={(item, i) => {
                    const Icon = item.icon;
                    const isOver = hovered === i;
                    return (
                        <List.Item
                            onMouseEnter={() => setHovered(i)}
                            onMouseLeave={() => setHovered(null)}
                            style={{
                                display: 'flex', alignItems: 'flex-start',
                                backgroundColor: isOver ? hoverBg : 'transparent',
                                borderRadius: 8, marginBottom: 12,
                                padding: '12px', transition: 'background-color 0.2s ease'
                            }}
                        >
                            <Icon style={{ fontSize: 20, marginRight: 12, color: current.text }} />
                            <div style={{ flex: 1 }}>
                                <Text style={{ display: 'block', color: current.text }}>
                                    {item.text}
                                </Text>
                            </div>
                        </List.Item>
                    );
                }}
            />
        </Card>
    );
}
