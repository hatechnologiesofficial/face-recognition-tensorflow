"use client";

import type { ReactNode } from "react";
import {
  BankOutlined,
  DashboardOutlined,
  LogoutOutlined,
  PlusOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { App, Avatar, Badge, Button, Layout, Menu, Space, Typography } from "antd";
import type { MenuProps } from "antd";
import { usePathname, useRouter } from "next/navigation";

const { Header, Content, Sider } = Layout;

type AppShellProps = {
  actions?: ReactNode;
  children: ReactNode;
  eyebrow: string;
  title: string;
};

const navItems: MenuProps["items"] = [
  {
    key: "/dashboard",
    icon: <DashboardOutlined />,
    label: "Dashboard",
  },
  {
    key: "/students",
    icon: <TeamOutlined />,
    label: "Students",
  },
  {
    key: "/student/create",
    icon: <PlusOutlined />,
    label: "Create Student",
  },
];

function getSelectedKey(pathname: string) {
  if (pathname.startsWith("/student/create")) {
    return "/student/create";
  }

  if (pathname.startsWith("/students")) {
    return "/students";
  }

  return "/dashboard";
}

export function AppShell({ actions, children, eyebrow, title }: AppShellProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { message } = App.useApp();

  const handleLogout = () => {
    document.cookie = "user=; Max-Age=0; path=/";
    message.success("Logged out");
    router.replace("/signin");
  };

  return (
    <Layout className="dashboard-layout">
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        width={264}
        className="dashboard-sider"
      >
        <div className="sider-brand">
          <div className="brand-badge">
            <BankOutlined />
          </div>
          <div>
            <Typography.Text className="brand-title">ISTS Services</Typography.Text>
            <Typography.Text className="brand-subtitle">
              College workspace
            </Typography.Text>
          </div>
        </div>

        <Menu
          mode="inline"
          theme="dark"
          selectedKeys={[getSelectedKey(pathname)]}
          items={navItems}
          onClick={({ key }) => router.push(key)}
          className="sider-menu"
        />

        <div className="sider-profile">
          <Space size={12}>
            <Avatar className="profile-avatar" icon={<UserOutlined />} />
            <div>
              <Typography.Text className="profile-name">College Admin</Typography.Text>
              <Typography.Text className="profile-role">Administrator</Typography.Text>
            </div>
          </Space>
          <Button
            block
            danger
            icon={<LogoutOutlined />}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
      </Sider>

      <Layout className="dashboard-main">
        <Header className="dashboard-topbar">
          <div>
            <Typography.Text className="dashboard-eyebrow">
              {eyebrow}
            </Typography.Text>
            <Typography.Title level={2}>{title}</Typography.Title>
          </div>
          <Space size={14}>
            {actions}
            <Badge dot color="#16a34a">
              <Avatar size={42} icon={<UserOutlined />} />
            </Badge>
            <div className="header-user">
              <Typography.Text strong>College Admin</Typography.Text>
              <Typography.Text type="secondary">Online now</Typography.Text>
            </div>
          </Space>
        </Header>

        <Content className="dashboard-content">{children}</Content>
      </Layout>
    </Layout>
  );
}
