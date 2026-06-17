import { MongoClient } from "mongodb";
export async function GET() {
    const client = new MongoClient(process.env.MONGODB_URI as string);
    try {
        await client.connect();
        const db = client.db("ists")
        const myCollection = db.collection("students")
        const result = await myCollection.find().toArray()

        return Response.json(result , { status: 200 });
    } catch {
        return Response.json(
            { message: "not connected" },
            { status: 500, });
    }

}
export async function POST(request: Request) {
    const body = await request.json()

    if (!body.name) {
        return Response.json({ message: "Name is required" }, { status: 400 })
    }
    if (!body.enrollmentNumber) {
        return Response.json({ message: "Enrollment Number is required" }, { status: 400 })
    }
    if (!body.branch) {
        return Response.json({ message: "Branch is required" }, { status: 400 })
    }
    if (!body.semester) {
        return Response.json({ message: "Semester is required" }, { status: 400 })
    }
    const client = new MongoClient(process.env.MONGODB_URI as string);

    try {
        await client.connect();
        const db = client.db("ists")
        const myCollection = db.collection("students")
        const finded = await myCollection.findOne({ enrollmentNumber: body.enrollmentNumber })
        if (finded) {
            return Response.json({ message: "Enrollment Number already exists" }, { status: 400 })
        }
        const result = await myCollection.insertOne({
            name: body.name,
            enrollmentNumber: body.enrollmentNumber,
            branch: body.branch,
            semester: body.semester
        })
        if (result) {
            return Response.json({
                message: "Data inserted successfully",
                result
            }, { status: 200 });
        } else {
            return Response.json({ message: "Failed to insert data" }, { status: 500 });
        }

    } catch {
        return Response.json(
            { message: "not connected" },
            { status: 500, });
    }
}
