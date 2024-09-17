import React, { useState } from 'react';
import { Form, Input, Button, Typography, message, Divider } from 'antd';
import { Link } from 'react-router-dom';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import { register } from '../services/api';
import '../styles/signup-page.css';

const { Title, Text } = Typography;

interface SignUpForm {
  email: string;
  password: string;
  confirmPassword: string;
}

const SignUp: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: SignUpForm) => {
    if (values.password !== values.confirmPassword) {
      message.error('Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      const response = await register(values.email, values.password);
      console.log('Signup successful:', response);
      message.success('Signup successful. Please log in.');
    } catch (err) {
      console.error('Signup error:', err);
      message.error('Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <div className="music-note">♪</div>
      <div className="music-note">♫</div>
      <div className="music-note">♩</div>
      <div className="music-note">♬</div>
      <div className="signup-card">
        <div className="logo">🎵</div>
        <Title level={2} style={{textAlign: 'center', marginBottom: '20px', color: '#1e3c72'}}>
          Sign up for Vibe
        </Title>
        <Form
          name="signup"
          initialValues={{remember: true}}
          onFinish={onFinish}
        >
          <Form.Item
            name="email"
            rules={[
              {required: true, message: 'Please input your Email!'},
              {type: 'email', message: 'Please enter a valid email!'}
            ]}
          >
            <Input prefix={<MailOutlined/>} placeholder="Email" size="large"/>
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {required: true, message: 'Please input your Password!'},
              {min: 8, message: 'Password must be at least 8 characters long'}
            ]}
          >
            <Input.Password
              prefix={<LockOutlined/>}
              placeholder="Password"
              size="large"
            />
          </Form.Item>
          <Form.Item
            name="confirmPassword"
            rules={[
              {required: true, message: 'Please confirm your Password!'},
              ({getFieldValue}) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('The two passwords do not match!'));
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<LockOutlined/>}
              placeholder="Confirm Password"
              size="large"
            />
          </Form.Item>
          <Form.Item>
            <Button className="signup-button" type="primary" htmlType="submit" loading={loading} size="large" block>
              Sign up
            </Button>
          </Form.Item>
        </Form>
        <Divider plain>Or</Divider>

        <Text style={{ display: 'block', textAlign: 'center' }}>
          Already have an account? <Link to="/">Sign in</Link>
        </Text>
      </div>
    </div>
  );
};

export default SignUp;
