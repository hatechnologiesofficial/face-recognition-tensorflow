"use client"
import Link from "next/link";
import { Flex, Spin } from "antd"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"



const profileActions = [
  { label: "Resume", href: "#resume", className: "profile-action-resume" },
  { label: "Projects", href: "#projects", className: "profile-action-projects" },
  { label: "Contact", href: "#contact", className: "profile-action-contact" },
];

export default function ProfilePage() {


  const params = useParams<{ profileId: string }>()
    const [student, setStudent] = useState<{
        _id: string,
        name: string,
        enrollmentNumber: number,
        branch: string,
        semester: number,
        image:string,
        introduction:string
    }>({
        _id: "",
        name: "",
        enrollmentNumber: 0,
        branch: "",
        semester: 0,
        image:"",
        introduction:""
    })
    const [loading, setLoading] = useState(false)

    const initialiseUserProfile = async (profileId: string) => {
        setLoading(true)
        const apiRes = await fetch(`/api/students/${profileId}`)
        const apiJson = await apiRes.json()
        setStudent(apiJson)
        setLoading(false)
    }

    useEffect(() => {
        initialiseUserProfile(params.profileId)
    }, [params.profileId])



  return (
    <main className="public-profile-page">
      <section className="public-profile-shell" aria-label={`${student.branch} profile`}>
        <div className="public-profile-photo-wrap">
          <div
            aria-label={student.name}
            className="public-profile-photo"
            role="img"
            style={{ backgroundImage: `url(${student.image})` }}
          />
        </div>

        <div className="public-profile-content">
          <p className="public-profile-role">Semester : {student.semester}</p>
          <h1>{student.name}</h1>
          <div className="public-profile-about">
            <h2>A Bit About Me</h2>
            <p>{student.introduction}</p>
          </div>

          <nav className="public-profile-actions" aria-label="Profile sections">
            {profileActions.map((action) => (
              <Link
                className={`public-profile-action ${action.className}`}
                href={action.href}
                key={action.label}
              >
                {action.label}
              </Link>
            ))}
          </nav>
        </div>
      </section>
    </main>
  );
}
