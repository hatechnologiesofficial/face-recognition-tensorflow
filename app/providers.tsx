"use client";

import type { ReactNode } from "react";
import { App, ConfigProvider } from "antd";

export function AntdProvider({ children }: { children: ReactNode }) {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#2563eb",
          colorSuccess: "#16a34a",
          colorWarning: "#f59e0b",
          borderRadius: 8,
          fontFamily: "var(--font-geist-sans), Arial, Helvetica, sans-serif",
        },
        components: {
          Button: {
            controlHeight: 42,
          },
          Card: {
            borderRadiusLG: 8,
          },
          Input: {
            controlHeight: 42,
          },
          Layout: {
            bodyBg: "#f4f7fb",
            headerBg: "#ffffff",
            siderBg: "#132238",
          },
          Menu: {
            darkItemBg: "#132238",
            darkItemSelectedBg: "#2563eb",
            darkItemHoverBg: "rgba(255,255,255,0.08)",
            darkSubMenuItemBg: "#101d30",
          },
        },
      }}
    >
      <App>{children}</App>
    </ConfigProvider>
  );
}
