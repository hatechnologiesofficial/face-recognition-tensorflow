"use client";

import { SaveOutlined } from "@ant-design/icons";
import { Alert, App, Button, Card, Form, Input, Select, Space, Typography, Upload, UploadProps } from "antd";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AppShell } from "../../../components/AppShell";

type StudentFormValues = {
  branch: string;
  enrollmentNumber: string;
  name: string;
  semester: string;
  introduction: string,
  image: string
};

const branchOptions = [
  "Computer Science",
  "Data Science",
  "Mechanical Engineering",
  "Business Administration",
  "Electronics",
  "Civil Engineering",
].map((branch) => ({ label: branch, value: branch }));

const semesterOptions = Array.from({ length: 8 }, (_, index) => {
  const semester = String(index + 1);

  return {
    label: `Semester ${semester}`,
    value: semester,
  };
});


const getBase64 = (img: any, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

export default function CreateStudentPage() {
  const router = useRouter();
  const { message } = App.useApp();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [imageBase64, setImageBase64] = useState("")

  const handleSubmit = async (value: StudentFormValues) => {
    value.image = imageBase64
    const response = await fetch("/api/students", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(value)
    })
    if (response.ok) {
      router.push("/students");
    }

  }

  const handleChange: UploadProps['onChange'] = (info) => {
    getBase64(info.file.originFileObj as any, (url) => {
      console.log("getBase64 url", url);
      setImageBase64(url)
    });
  };


  return (
    <AppShell eyebrow="Student Management" title="Create Student">
      <Space orientation="vertical" size={24} className="dashboard-stack">
        <section className="page-hero">
          <div>
            <Typography.Text className="section-kicker">Student Create</Typography.Text>
            <Typography.Title level={1}>Create student profile</Typography.Title>
            <Typography.Text className="hero-copy">
              Add enrollment details, academic branch, and semester information.
            </Typography.Text>
          </div>
        </section>

        <Card className="section-card form-card" title="Student Fields">
          {error ? <Alert showIcon type="error" message={error} /> : null}

          <Form
            layout="vertical"
            requiredMark={false}
            className="student-form"
            onFinish={handleSubmit}
          >
            <div className="student-form-grid">
              <Form.Item>
                <Upload
                  accept={"image/png"}
                  name="avatar"
                  listType="picture-circle"
                  showUploadList={false}
                  // beforeUpload={beforeUpload}
                  onChange={handleChange}
                >
                  {imageBase64 ? <img src={imageBase64} /> :
                    <p>Select Image</p>}
                </Upload>

              </Form.Item>
              <Form.Item
                label="Student name"
                name="name"
                rules={[{ required: true, message: "Student name is required" }]}
              >
                <Input placeholder="Enter student name" autoComplete="name" />
              </Form.Item>

              <Form.Item
                label="Enrollment number"
                name="enrollmentNumber"
                rules={[
                  { required: true, message: "Enrollment number is required" },
                ]}
              >
                <Input placeholder="ISTS-CS-001" autoComplete="off" />
              </Form.Item>

              <Form.Item
                label="Branch"
                name="branch"
                rules={[{ required: true, message: "Branch is required" }]}
              >
                <Select placeholder="Select branch" options={branchOptions} />
              </Form.Item>

              <Form.Item
                label="Semester"
                name="semester"
                rules={[{ required: true, message: "Semester is required" }]}
              >
                <Select placeholder="Select semester" options={semesterOptions} />
              </Form.Item>
              <Form.Item label="Introduction" name={"introduction"}>
                <Input.TextArea />
              </Form.Item>
            </div>

            <div className="form-actions">
              <Button onClick={() => router.push("/students")}>Cancel</Button>
              <Button
                type="primary"
                htmlType="submit"
                icon={<SaveOutlined />}
                loading={loading}
              >
                Create Student
              </Button>
            </div>
          </Form>
        </Card>
      </Space>
    </AppShell>
  );
}
