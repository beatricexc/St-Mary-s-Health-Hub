import React, { useContext, useState } from 'react';
import { Card, Typography, Button } from 'antd';
import { YoutubeOutlined, CloseOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { extractIngredients, extractIngredientsWithMeasures } from './utils';
import { ThemeContext } from '../../../context/ThemeProvider';

const { Title, Paragraph } = Typography;

const MealModal = ({ open, handleClose, meal }) => {
    const { isDarkMode } = useContext(ThemeContext);
    const [showFullInstructions, setShowFullInstructions] = useState(false);

    if (!meal || !open) return null;

    const ingredients = extractIngredients(meal);
    const ingredientsWithMeasures = extractIngredientsWithMeasures(meal);

    const themeSettings = {
        dark: {
            text: '#F5F5FF',
            cardBg: '#1A103D',
            primary: '#A78BFA',
            secondary: '#FACC15', // nice yellow
            shadow: '0 8px 24px rgba(167, 139, 250, 0.12)',
        },
        light: {
            text: '#2D3436',
            cardBg: '#FFFFFF',
            primary: '#284497',
            secondary: '#36A2EB',
            shadow: '0 8px 24px rgba(54, 162, 235, 0.12)',
        },
    };

    const currentTheme = isDarkMode ? themeSettings.dark : themeSettings.light;

    const instructions = showFullInstructions
        ? meal.strInstructions
        : meal.strInstructions.slice(0, 300) + (meal.strInstructions.length > 300 ? '...' : '');

    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                zIndex: 1000,
                width: '100vw',
                height: '100vh',
                backgroundColor: 'rgba(0,0,0,0.6)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: 20,
            }}
            onClick={handleClose}
        >
            <Card
                title={meal.strMeal}
                variant={false}
                onClick={(e) => e.stopPropagation()}
                extra={
                    <Button
                        icon={<CloseOutlined />}
                        shape="circle"
                        size="small"
                        onClick={handleClose}
                        style={{
                            border: 'none',
                            background: 'transparent',
                            color: currentTheme.text,
                        }}
                    />
                }
                styles={{
                    header: {
                        color: currentTheme.text,
                        fontWeight: 500,
                        textAlign: 'center',
                        borderBottom: 'none',
                        padding: '24px 24px 0',
                    },
                    body: {
                        color: currentTheme.text,
                        padding: '16px 24px 24px',
                        backgroundColor: currentTheme.cardBg,
                    },
                }}
                style={{
                    width: '100%',
                    maxWidth: 700,
                    backgroundColor: currentTheme.cardBg,
                    boxShadow: currentTheme.shadow,
                    borderRadius: 12,
                    color: currentTheme.text,
                    maxHeight: '90vh',
                    overflowY: 'auto',
                }}
            >
                <div style={{ textAlign: 'center', marginBottom: 24 }}>
                    <img
                        src={meal.strMealThumb}
                        alt={meal.strMeal}
                        style={{
                            width: '100%',
                            maxWidth: 350,
                            height: 'auto',
                            maxHeight: 250,
                            borderRadius: 16,
                            objectFit: 'cover',
                        }}
                    />
                </div>


                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr'
                }}>
                    <div>
                        <Title level={5} style={{ color: currentTheme.text }}>
                            🧂 Ingredients
                        </Title>
                        <ul style={{ paddingLeft: 20, marginBottom: 24 }}>
                            {ingredients.map((ingredient, index) => (
                                <li key={index}>{ingredient}</li>
                            ))}
                        </ul>
                    </div>
                    {/* Ingredients */}
                    <div>
                        <Title level={5} style={{ color: currentTheme.text }}>
                            📏 Measures
                        </Title>
                        <ul style={{ paddingLeft: 20, marginBottom: 24 }}>
                            {ingredientsWithMeasures.map((item, index) => (
                                <li key={index}>
                                    {item.ingredient} – {item.measure}
                                </li>
                            ))}
                        </ul>
                    </div>




                </div>
                {/* Instructions */}
                <Title level={5} style={{ color: currentTheme.text }}>📖 Instructions</Title>
                <Paragraph style={{ color: currentTheme.text, marginBottom: 8 }}>
                    {instructions}
                </Paragraph>
                {meal.strInstructions.length > 300 && (
                    <Button
                        size="small"
                        type="link"
                        style={{ padding: 0, color: currentTheme.primary }}
                        onClick={() => setShowFullInstructions(!showFullInstructions)}
                    >
                        {showFullInstructions ? 'Show less' : 'Read more'}
                    </Button>
                )}
                {/* Ingredients + Measures */}


                {/* YouTube */}
                {meal.strYoutube && (
                    <>
                        <Title level={5} style={{ marginTop: 32, color: currentTheme.text }}>
                            📹 Video Tutorial
                        </Title>
                        <Link
                            to={meal.strYoutube}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Button
                                icon={<YoutubeOutlined />}
                                style={{
                                    backgroundColor: currentTheme.primary, // changed from `secondary`
                                    border: 'none',
                                    color: isDarkMode ? '#1A103D' : '#fff',
                                    fontWeight: 500,
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 8,
                                    padding: '4px 12px',
                                    borderRadius: 8,
                                    marginTop: 8,
                                }}
                            >
                                Watch on YouTube
                            </Button>
                        </Link>
                    </>
                )}
            </Card>
        </div>
    );
};

export default MealModal;
