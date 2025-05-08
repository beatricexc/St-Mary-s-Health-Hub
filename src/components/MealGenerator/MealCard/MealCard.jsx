import React, { useContext } from 'react';
import { Card, Button, Typography } from 'antd';
import meal_generator from '../../../assets/meal_generator.png';
import meal_dark from '../../../assets/meal_generator_dark.png';
import { ThemeContext } from '../../../context/ThemeProvider';

const { Text } = Typography;

const MealCard = ({ onGenerateMeal }) => {
    const { isDarkMode } = useContext(ThemeContext);

    const themeSettings = {
        dark: {
            text: '#F5F5FF',
            cardBg: '#284497', //night blue 
            primary: '#A78BFA',
            shadow: '0 8px 24px rgba(167, 139, 250, 0.12)'
        },
        light: {
            text: '#2D3436',
            cardBg: '#FFFFFF',
            primary: '#284497',
            shadow: '0 8px 24px rgba(40, 68, 151, 0.12)'
        }
    };

    const currentTheme = isDarkMode ? themeSettings.dark : themeSettings.light;

    const handleGenerateMeal = () => {
        onGenerateMeal()
    }

    return (
        <Card
            variant="inner"
            styles={{
                body: {
                    padding: '24px',
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
            {/* Custom Header */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 24,
                gap: 8
            }}>
                <span style={{ fontSize: '20px' }}>🪄</span>
                <Text strong style={{
                    fontSize: 18,
                    color: currentTheme.text,
                    margin: 0
                }}>
                    Meal Generator
                </Text>
            </div>

            {/* Image */}
            <img
                alt="Meal generator"
                src={isDarkMode ? meal_dark : meal_generator}
                style={{
                    width: '100%',
                    height: 'auto',
                    borderRadius: 8,
                    marginBottom: 24,
                    maxHeight: 200,
                    objectFit: 'contain'
                }}
            />

            <Text style={{
                color: isDarkMode ? 'rgba(245, 245, 255, 0.7)' : 'rgba(45, 52, 54, 0.7)',
                marginBottom: 24,
                textAlign: 'center'
            }}>
                Don't know what to eat?
            </Text>

            <Button
                type="primary"
                block
                style={{
                    height: 40,
                    borderRadius: 8,
                    border: 'none',
                    background: currentTheme.primary,
                    fontWeight: 500
                }}
                onClick={handleGenerateMeal}
            >
                Generate Meal
            </Button>
        </Card>
    );
};

export default MealCard;