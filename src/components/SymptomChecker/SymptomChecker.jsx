// src/components/SymptomChecker/SymptomChecker.jsx

import React, { useState, useContext } from 'react';
import {
    Steps, Button, Card, Tag, AutoComplete,
    Divider, List, Typography, Alert, Spin, Progress
} from 'antd';
import { SearchOutlined, PlusOutlined, LoadingOutlined } from '@ant-design/icons';
import { ThemeContext } from '../../context/ThemeProvider';
import conditionDb from '../../data/conditionDb';
import symptomDb from '../../data/symptomDb';
import severityLevels from '../../data/severityLevels';
import {
    findPossibleConditions,
    getRecommendedAction,
    getSymptomSuggestions,
    getThemeSettings
} from './utils';
import './SymptomChecker.css';

const { Step } = Steps;
const { Title, Text } = Typography;

const SymptomChecker = () => {
    // Consume the current theme (light or dark) for styling
    const { isDarkMode } = useContext(ThemeContext);

    // Track which step of the three-step wizard is active (0–2)
    const [currentStep, setCurrentStep] = useState(0);

    // User-entered symptoms list and current input value
    const [symptoms, setSymptoms] = useState([]);
    const [inputValue, setInputValue] = useState('');

    // Results of analysis: possible conditions and loading state
    const [possibleConditions, setPossibleConditions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [analysisComplete, setAnalysisComplete] = useState(false);

    // User-selected severity level of their symptoms
    const [severity, setSeverity] = useState(null);

    // Derive theme-specific colors, borders, etc.
    const currentTheme = getThemeSettings(isDarkMode);

    // Add the current input value to the symptoms list (if not duplicate)
    const handleAddSymptom = () => {
        if (inputValue && !symptoms.includes(inputValue)) {
            setSymptoms([...symptoms, inputValue]);
            setInputValue('');
        }
    };

    // Remove a symptom tag when the user clicks its close button
    const handleRemoveSymptom = (symptomToRemove) => {
        setSymptoms(symptoms.filter(symptom => symptom !== symptomToRemove));
    };

    // Perform the “analysis” by finding matching conditions after a brief delay
    const analyzeSymptoms = () => {
        setLoading(true);
        setAnalysisComplete(false);

        // Simulate async processing (e.g. API call)
        setTimeout(() => {
            const results = findPossibleConditions(symptoms, severity, conditionDb);
            setPossibleConditions(results);
            setLoading(false);
            setAnalysisComplete(true);
            // Advance to the Results step
            setCurrentStep(2);
        }, 1500);
    };

    // Determine recommended action based on analysis output
    const recommendedAction = getRecommendedAction(possibleConditions, symptoms);

    return (
        <div className="symptom-checker-container">
            <Card
                title={<Title level={4} style={{ margin: 0 }}>Symptom Checker</Title>}
                style={{
                    backgroundColor: currentTheme.cardBg,
                    color: currentTheme.text,
                    border: currentTheme.border,
                    borderRadius: 12,
                    maxWidth: 800,
                    margin: '0 auto'
                }}
            >
                {/* Step indicator for the three phases */}
                <Steps current={currentStep} responsive={false}>
                    <Step title="Describe Symptoms" />
                    <Step title="Select Severity" />
                    <Step title="Results" />
                </Steps>

                <Divider />

                {/* STEP 0: Enter symptoms */}
                {currentStep === 0 && (
                    <div className="step-content">
                        <Text strong style={{ display: 'block', marginBottom: 16 }}>
                            What symptoms are you experiencing?
                        </Text>

                        {/* Input+button to add new symptom tags */}
                        <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
                            <AutoComplete
                                options={getSymptomSuggestions(inputValue, symptomDb)}
                                style={{ flex: 1 }}
                                value={inputValue}
                                onChange={setInputValue}
                                onSelect={(value) => {
                                    setInputValue(value);
                                    handleAddSymptom();
                                }}
                                placeholder="e.g. Headache, Fever"
                            />
                            <Button
                                type="primary"
                                icon={<PlusOutlined />}
                                onClick={handleAddSymptom}
                            />
                        </div>

                        {/* Display added symptoms as removable tags */}
                        <div className="symptoms-list">
                            {symptoms.map(symptom => (
                                <Tag
                                    key={symptom}
                                    closable
                                    onClose={() => handleRemoveSymptom(symptom)}
                                    style={{ marginBottom: 8, padding: '4px 8px', fontSize: 14 }}
                                >
                                    {symptom}
                                </Tag>
                            ))}
                        </div>

                        {/* Continue only if at least one symptom is entered */}
                        <Button
                            type="primary"
                            onClick={() => setCurrentStep(1)}
                            disabled={symptoms.length === 0}
                            style={{ marginTop: 24 }}
                        >
                            Continue
                        </Button>
                    </div>
                )}

                {/* STEP 1: Choose severity level */}
                {currentStep === 1 && (
                    <div className="step-content">
                        <Text strong style={{ display: 'block', marginBottom: 16 }}>
                            How severe are your symptoms?
                        </Text>

                        {/* Cards for each severity option */}
                        <div className="severity-options">
                            {severityLevels.map(({ level, description }) => (
                                <Card
                                    key={level}
                                    hoverable
                                    onClick={() => setSeverity(level)}
                                    style={{
                                        marginBottom: 12,
                                        border: severity === level
                                            ? `2px solid ${isDarkMode ? '#A78BFA' : '#284497'}`
                                            : currentTheme.border,
                                        backgroundColor: severity === level
                                            ? (isDarkMode ? 'rgba(167, 139, 250, 0.1)' : 'rgba(40, 68, 151, 0.05)')
                                            : 'transparent'
                                    }}
                                >
                                    <Text strong>{level}</Text>
                                    <Text type="secondary" style={{ display: 'block' }}>
                                        {description}
                                    </Text>
                                </Card>
                            ))}
                        </div>

                        {/* Navigation buttons: Back or Analyze */}
                        <div style={{ display: 'flex', gap: 8, marginTop: 24 }}>
                            <Button onClick={() => setCurrentStep(0)}>Back</Button>
                            <Button
                                type="primary"
                                onClick={analyzeSymptoms}
                                disabled={!severity}
                                icon={loading ? <LoadingOutlined /> : <SearchOutlined />}
                                loading={loading}
                            >
                                {loading ? 'Analyzing...' : 'Analyze Symptoms'}
                            </Button>
                        </div>
                    </div>
                )}

                {/* STEP 2: Show results and recommendation */}
                {currentStep === 2 && (
                    <div className="step-content">
                        <Text strong style={{ display: 'block', marginBottom: 16 }}>
                            Possible Conditions
                        </Text>

                        {loading ? (
                            // Show spinner while loading
                            <div style={{ textAlign: 'center', padding: 24 }}>
                                <Spin indicator={<LoadingOutlined style={{ fontSize: 32 }} spin />} />
                                <Text style={{ display: 'block', marginTop: 16 }}>
                                    Analyzing your symptoms...
                                </Text>
                            </div>
                        ) : (
                            <>
                                {/* List of matched conditions with confidence meters */}
                                {analysisComplete && (
                                    <>
                                        <List
                                            dataSource={possibleConditions}
                                            renderItem={(item) => (
                                                <List.Item>
                                                    <div style={{ width: '100%' }}>
                                                        <div style={{
                                                            display: 'flex',
                                                            justifyContent: 'space-between',
                                                            marginBottom: 4
                                                        }}>
                                                            <Text strong>{item.name}</Text>
                                                            <Text type="secondary">{item.confidence}% match</Text>
                                                        </div>
                                                        <div style={{
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            gap: 8
                                                        }}>
                                                            <Progress
                                                                percent={item.confidence}
                                                                showInfo={false}
                                                                strokeColor={isDarkMode ? '#A78BFA' : '#284497'}
                                                                trailColor={isDarkMode ? 'rgba(245, 245, 255, 0.1)' : 'rgba(0,0,0,0.05)'}
                                                                style={{ flex: 1 }}
                                                            />
                                                            <Text type="secondary" style={{ fontSize: 12 }}>
                                                                {item.matchingSymptoms}/{item.totalSymptoms} symptoms
                                                            </Text>
                                                        </div>
                                                    </div>
                                                </List.Item>
                                            )}
                                        />
                                        {/* Advice or action recommendation */}
                                        <Alert
                                            message={recommendedAction.message}
                                            description={recommendedAction.description}
                                            type={recommendedAction.type}
                                            showIcon
                                            style={{ marginTop: 24 }}
                                        />
                                    </>
                                )}

                                {/* Option to reset and start over */}
                                <div style={{ display: 'flex', gap: 8, marginTop: 24 }}>
                                    <Button onClick={() => setCurrentStep(1)}>Back</Button>
                                    <Button
                                        type="primary"
                                        onClick={() => {
                                            // Reset all analysis state
                                            setCurrentStep(0);
                                            setSymptoms([]);
                                            setSeverity(null);
                                            setPossibleConditions([]);
                                            setAnalysisComplete(false);
                                        }}
                                    >
                                        Start New Check
                                    </Button>
                                </div>
                            </>
                        )}
                    </div>
                )}
            </Card>
        </div>
    );
};

export default SymptomChecker;
