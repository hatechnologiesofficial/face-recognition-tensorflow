"use client"
import { Flex, Spin } from "antd"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

type StudentProfile = {
  _id: string,
  name: string,
  enrollmentNumber: number,
  branch: string,
  semester: number,
  image: string,
  introduction: string,
  first_year_marks: string,
  second_year_marks: string,
  third_year_marks: string
}

const emptyStudent: StudentProfile = {
  _id: "",
  name: "",
  enrollmentNumber: 0,
  branch: "",
  semester: 0,
  image: "",
  introduction: "",
  first_year_marks: "",
  second_year_marks: "",
  third_year_marks: "",
}

export default function ProfilePage() {


  const params = useParams<{ profileId: string }>()
  const [student, setStudent] = useState<StudentProfile>(emptyStudent)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let isActive = true

    const loadProfile = async () => {
      const apiRes = await fetch(`/api/students/id/${params.profileId}`)
      const apiJson = await apiRes.json()

      if (!isActive) return
      setStudent(apiJson)
      setLoading(false)
    }

    loadProfile()

    return () => {
      isActive = false
    }
  }, [params.profileId])

  const yearMarks = [
    {
      label: "1st Year",
      value: student.first_year_marks,
      className: "profile-action-resume",
    },
    {
      label: "2nd Year",
      value: student.second_year_marks,
      className: "profile-action-projects",
    },
    {
      label: "3rd Year",
      value: student.third_year_marks,
      className: "profile-action-contact",
    },
  ]

  const studentName = student.name || "Student Profile"
  const initials = studentName
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()

  return loading ? <Flex
    className="public-profile-loading"
    justify="center"
    align="center"
  >
    <Spin size="large" />
  </Flex> : (
    <main className="public-profile-page">
      <section className="public-profile-shell" aria-label={`${student.branch || "Student"} profile`}>
        <div className="public-profile-visual">
          <div className="public-profile-brand">
            <span>ISTS</span>
            <strong>Student Identity</strong>
          </div>

          <div className="public-profile-photo-wrap">
            {student.image ? (
              <div
                aria-label={studentName}
                className="public-profile-photo"
                role="img"
                style={{ backgroundImage: `url(${student.image})` }}
              />
            ) : (
              <div className="public-profile-photo public-profile-photo-fallback">
                {initials}
              </div>
            )}
          </div>

          <div className="public-profile-id-card">
            <span>Enrollment No.</span>
            <strong>{student.enrollmentNumber || "-"}</strong>
          </div>
        </div>

        <div className="public-profile-content">
          <div className="public-profile-meta">
            <span>{student.branch || "Student Profile"}</span>
            <span>Semester {student.semester || "-"}</span>
            <span>Academic Record</span>
          </div>
          <h1>{studentName}</h1>
          <div className="public-profile-about">
            <h2>Profile Summary</h2>
            <p>
              {student.introduction ||
                "This student profile is being prepared. Academic details and introduction will appear here once updated."}
            </p>
          </div>

          <div className="public-profile-section-heading">
            <span>Marks overview</span>
            <strong>Year-wise performance</strong>
          </div>

          <div className="public-profile-actions" aria-label="Academic marks by year">
            {yearMarks.map((item) => (
              <div className={`public-profile-action ${item.className}`} key={item.label}>
                <p>{item.label}</p>
                <h6>{item.value || "N/A"}</h6>
                <span>{item.value ? "Marks secured" : "Pending update"}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
