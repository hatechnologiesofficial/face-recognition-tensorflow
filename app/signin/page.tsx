"use client";

import {
  LockOutlined,
  LoginOutlined,
  MailOutlined,
  SafetyCertificateOutlined,
} from "@ant-design/icons";
import { Alert, App, Button, Card, Form, Input, Space, Typography } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

type SignInValues = {
  email: string;
  password: string;
};

const SignInPage = () => {
  const router = useRouter();
  const { message } = App.useApp();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignin = async (values: SignInValues) => {
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      const data = await response.json().catch(() => ({}));

      if (response.ok) {
        message.success("Signed in successfully");
        router.push("/dashboard");
        return;
      }

      setError(data.message ?? "Unable to sign in. Please check your details.");
    } catch {
      setError("Unable to reach the server. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-screen">
      <section className="auth-shell" aria-label="Sign in">
        <aside className="auth-panel">
          <div className="auth-mark">
            <SafetyCertificateOutlined />
          </div>
          <Space orientation="vertical" size={16}>
            <Typography.Title level={1} className="auth-panel-title">
              ISTS Services
            </Typography.Title>
            <Typography.Text className="auth-panel-copy">
              Secure access for colleges to manage admissions, student records,
              and service requests from one dashboard.
            </Typography.Text>
          </Space>
        </aside>

        <Card className="auth-card" bordered={false}>
          <Space orientation="vertical" size={8} className="auth-heading">
            <Typography.Text className="auth-kicker">Welcome back</Typography.Text>
            <Typography.Title level={2}>Sign in</Typography.Title>
            <Typography.Text type="secondary">
              Continue to your ISTS workspace.
            </Typography.Text>
          </Space>

          {error ? (
            <Alert
              showIcon
              type="error"
              message={error}
              className="auth-alert"
            />
          ) : null}

          <Form
            layout="vertical"
            requiredMark={false}
            onFinish={handleSignin}
            className="auth-form"
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Email is required" },
                { type: "email", message: "Enter a valid email address" },
              ]}
            >
              <Input
                prefix={<MailOutlined />}
                placeholder="college@example.com"
                autoComplete="email"
              />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: "Password is required" }]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Enter password"
                autoComplete="current-password"
              />
            </Form.Item>

            <Button
              block
              type="primary"
              htmlType="submit"
              icon={<LoginOutlined />}
              loading={loading}
            >
              Sign in
            </Button>
          </Form>

          <Typography.Paragraph className="auth-switch">
            New college? <Link href="/signup">Create an account</Link>
          </Typography.Paragraph>
        </Card>
      </section>
    </main>
  );
};

export default SignInPage;
