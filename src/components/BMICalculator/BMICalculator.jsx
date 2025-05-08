import React, { useState, useContext } from "react";
import { Card, Typography, Button, Input, Slider, Space } from "antd";
import { CalculatorOutlined } from "@ant-design/icons";
import { ThemeContext } from "../../context/ThemeProvider";
import { calculateBmi, getBmiCategory } from "./utils";

const { Title, Text } = Typography;

export default function BMICalculator() {
    const { isDarkMode } = useContext(ThemeContext);
    const [weight, setWeight] = useState(70);
    const [height, setHeight] = useState(175);
    const [bmi, setBmi] = useState(null);

    const themeSettings = {
        dark: {
            text: '#F5F5FF',
            cardBg: '#1A103D',
            primary: '#A78BFA',
            shadow: '0 8px 24px rgba(167, 139, 250, 0.12)',
            sliderTrack: '#2D3748',
            sliderRail: '#1E293B'
        },
        light: {
            text: '#2D3436',
            cardBg: '#FFFFFF',
            primary: '#284497',
            shadow: '0 8px 24px rgba(54, 162, 235, 0.12)',
            sliderTrack: '#E2E8F0',
            sliderRail: '#F1F5F9'
        }
    };

    const currentTheme = isDarkMode ? themeSettings.dark : themeSettings.light;

    const handleCalculateBmi = () => {
        const bmi = calculateBmi(height, weight)
        setBmi(bmi);
    }

    return (
        <div style={{
            backgroundColor: isDarkMode ? '#0F082C' : 'white',
            padding: '40px 24px',
            minHeight: '65vh',
            transition: 'all 0.3s ease'
        }}>
            <Title level={2} style={{
                textAlign: 'center',
                marginBottom: 48,
                color: currentTheme.text
            }}>
                Health Tools
            </Title>
            <Card
                title={
                    <Space>
                        <CalculatorOutlined style={{ color: currentTheme.primary }} />
                        <Text strong style={{ color: currentTheme.text }}>BMI Calculator</Text>
                    </Space>
                }
                variant="inner"
                styles={{
                    header: {
                        borderBottom: 'none',
                        padding: '24px 24px 0',
                        textAlign: 'center'
                    },
                    body: {
                        padding: '24px',
                        backgroundColor: currentTheme.cardBg
                    }
                }}
                style={{
                    maxWidth: 500,
                    margin: '0 auto',
                    backgroundColor: currentTheme.cardBg,
                    boxShadow: currentTheme.shadow,
                    borderRadius: 12,
                    overflow: 'hidden'
                }}
            >
                <div style={{ marginBottom: 24 }}>
                    <Text strong style={{
                        color: isDarkMode ? 'rgba(245, 245, 255, 0.8)' : 'rgba(45, 52, 54, 0.8)',
                        display: 'block',
                        marginBottom: 8
                    }}>
                        Weight (kg):
                    </Text>
                    <Slider
                        min={40}
                        max={150}
                        value={weight}
                        onChange={setWeight}
                        // trackBg={currentTheme.primary}
                        // railBg={currentTheme.sliderRail}
                        trackStyle={{ backgroundColor: currentTheme.primary }}
                        railStyle={{ backgroundColor: currentTheme.sliderRail }}
                        handleStyle={{
                            borderColor: currentTheme.primary,
                            boxShadow: `0 0 0 2px ${currentTheme.primary}`
                        }}
                    />
                    <Input
                        value={weight}
                        onChange={(e) => setWeight(Number(e.target.value))}
                        style={{
                            marginTop: 16,
                            borderRadius: 8
                        }}
                    />
                </div>

                <div style={{ marginBottom: 32 }}>
                    <Text strong style={{
                        color: isDarkMode ? 'rgba(245, 245, 255, 0.8)' : 'rgba(45, 52, 54, 0.8)',
                        display: 'block',
                        marginBottom: 8
                    }}>
                        Height (cm):
                    </Text>
                    <Slider
                        min={140}
                        max={220}
                        value={height}
                        onChange={setHeight}
                        trackStyle={{ backgroundColor: currentTheme.primary }}
                        railStyle={{ backgroundColor: currentTheme.sliderRail }}
                        handleStyle={{
                            borderColor: currentTheme.primary,
                            boxShadow: `0 0 0 2px ${currentTheme.primary}`
                        }}
                    />
                    <Input
                        value={height}
                        onChange={(e) => setHeight(Number(e.target.value))}
                        style={{
                            marginTop: 16,
                            borderRadius: 8
                        }}
                    />
                </div>

                <Button
                    type="primary"
                    block
                    onClick={handleCalculateBmi}
                    style={{
                        height: 40,
                        borderRadius: 8,
                        border: 'none',
                        background: currentTheme.primary,
                        marginBottom: 24
                    }}
                >
                    Calculate BMI
                </Button>

                {bmi && (
                    <div style={{
                        textAlign: 'center',
                        padding: '16px',
                        borderRadius: 8,
                        background: isDarkMode ? 'rgba(167, 139, 250, 0.1)' : 'rgba(54, 162, 235, 0.1)'
                    }}>
                        <Title level={3} style={{
                            color: currentTheme.text,
                            marginBottom: 8
                        }}>
                            Your BMI: {bmi}
                        </Title>
                        <Text
                            strong
                            style={{
                                fontSize: 16,
                                color: getBmiCategory(bmi).includes('Normal') ?
                                    '#52c41a' : // success green
                                    (bmi < 18.5 ? '#faad14' : '#f5222d') // yellow for underweight, red for obese
                            }}
                        >
                            {getBmiCategory(bmi)}
                        </Text>
                    </div>
                )}
            </Card>
        </div>
    );
}