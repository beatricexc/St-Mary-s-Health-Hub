import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Form, Input, Space } from 'antd';
import { ThemeContext } from '../../context/ThemeProvider';

// Define the university domain for email validation
// This should be the same as the one used in the registration form
// and in the local storage for the user data
const uniDomain = '@live.stmarys.ac.uk';

console.log({
    emailCheck: new RegExp(`${uniDomain.replace('.', '\\.')}$`)
})


export default function LoginForm({ onLogin }) {
  const { isDarkMode } = useContext(ThemeContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    // resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log({
      data
    })
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser && storedUser.email === data.email && storedUser.password === data.password) {
      alert('Login successful!');
      onLogin();
    } else {
      alert('Invalid credentials');
    }
  };

  // Theme colors
  const labelColor = isDarkMode ? '#A78BFA' : '#284497';
  const errorColor = isDarkMode ? '#FF7875' : '#FF4D4F';
  const inputBg = isDarkMode ? '#1E0B4D' : '#F5F5FF';

  return (
    <Form
      onFinish={handleSubmit(onSubmit)}
      layout="vertical"
      style={{
        width: '100%',
        maxWidth: '400px',
        background: isDarkMode ? 'rgba(15, 8, 44, 0.9)' : 'rgba(250, 237, 181, 0.6)',
        padding: '32px',
        borderRadius: '12px',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)'
      }}
    >
      <Space direction="vertical" size={24} style={{ width: '100%' }}>
        <Form.Item
          label={<span style={{ color: labelColor, fontWeight: 600 }}>University Email</span>}
          validateStatus={errors.email ? 'error' : ''}
          help={errors.email && <span style={{ color: errorColor }}>{errors.email.message}</span>}
        >
          <Input
            size="large"
            placeholder={`regnum${uniDomain}`}
            style={{ 
              background: inputBg,
              padding: '12px',
              borderRadius: '6px'
            }}
            {...register('email')}
          />
        </Form.Item>

        <Form.Item
          label={<span style={{ color: labelColor, fontWeight: 600 }}>Password</span>}
          validateStatus={errors.password ? 'error' : ''}
          help={errors.password && <span style={{ color: errorColor }}>{errors.password.message}</span>}
        >
          <Input.Password
            size="large"
            placeholder="Enter your password"
            style={{ 
              background: inputBg,
              padding: '12px',
              borderRadius: '6px'
            }}
            {...register('password')}
          />
        </Form.Item>

        <Form.Item>
          <Button 
            type="primary" 
            htmlType="submit" 
            size="large"
            block
            style={{
              height: '48px',
              fontWeight: '600',
              fontSize: '16px',
              borderRadius: '6px'
            }}
          >
            Sign In
          </Button>
        </Form.Item>
      </Space>
    </Form>
  );
}