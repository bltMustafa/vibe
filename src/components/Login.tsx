import React, { useState } from "react";
import { Form, Input, Button, Typography, message, Divider } from "antd";
import { UserOutlined, LockOutlined, GithubOutlined, GoogleOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { login } from "../services/api";
import "../styles/login-page.css";

const { Title, Text } = Typography;

interface LoginForm {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: LoginForm) => {
    setLoading(true);
    try {
      const response = await login(values.email, values.password);
      console.log("Login successful:", response);
      message.success("Login successful");
      // Here you would typically redirect the user or update the app state
    } catch (err) {
      console.error("Login error:", err);
      message.error("Login failed. Please check your credentials and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="music-note">♪</div>
      <div className="music-note">♫</div>
      <div className="music-note">♩</div>
      <div className="music-note">♬</div>
      <div className="login-card">
        <div className="logo">🎵</div>
        <Title level={2} style={{textAlign: "center", marginBottom: "20px", color: "#1e3c72"}}>
          Sign in to Vibe
        </Title>
        <Form
          name="login"
          initialValues={{remember: true}}
          onFinish={onFinish}
        >
          <Form.Item
            name="email"
            rules={[
              {required: true, message: "Please input your Email!"},
              {type: "email", message: "Please enter a valid email!"},
            ]}
          >
            <Input prefix={<UserOutlined />} placeholder="Email" size="large"/>
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{required: true, message: "Please input your Password!"}]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Password"
              size="large"
            />
          </Form.Item>
          <Form.Item>
            <Button className="login-button" type="primary" htmlType="submit" loading={loading} size="large" block>
              Sign in
            </Button>
          </Form.Item>
        </Form>

        <Button type="link" block>
          <Link to="/forgot-password">Forgot password?</Link>
        </Button>

        <Divider plain>Or</Divider>

        <div className="social-buttons-container">
          <Button icon={<GithubOutlined />} size="large" style={{width: "48%"}}>
            GitHub
          </Button>
          <Button icon={<GoogleOutlined />} size="large" style={{width: "48%"}}>
            Google
          </Button>
        </div>

        <div className="signup-link" style={{marginTop: '20px', textAlign: 'center'}}>
          <Text>Don't have an account? <Link to="/signup">Sign up</Link></Text>
        </div>
      </div>
    </div>
  );
};

export default Login;
