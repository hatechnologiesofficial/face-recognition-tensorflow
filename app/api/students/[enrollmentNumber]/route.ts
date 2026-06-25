import { MongoClient } from "mongodb";

export async function GET(request: Request,
    { params }: { params: Promise<{ enrollmentNumber: string }> }
) {
    const { enrollmentNumber } = await params
    const client = new MongoClient(process.env.MONGODB_URI as string);

    try {
        await client.connect();
        const db = client.db("ists")
        const myCollection = db.collection("students")
        const result = await myCollection.findOne({ enrollmentNumber: String(enrollmentNumber) })
        if (result) {
            return Response.json(result, { status: 200 });
        } else {
            return Response.json({ message: "Student not found" }, { status: 404 })
        }

    } catch {
        return Response.json(
            { message: "not connected" },
            { status: 500, });
    }
}

export async function PATCH(request: Request) {
    const body = await request.json()

    console.log("body", body);


    if (!body.enrollmentNumber) {
        return Response.json(
            { message: "enrollmentNumber not found" },
            { status: 400, });
    }
    if (!body.first_year_marks) {
        return Response.json(
            { message: "first_year_marks not found" },
            { status: 400, });
    }

    const client = new MongoClient(process.env.MONGODB_URI as string);

    try {
        await client.connect()

        const db = client.db("ists")
        const myCollection = db.collection("students")
        const result = await myCollection.findOne({ enrollmentNumber: String(body.enrollmentNumber) })
        if (!result) {
            return Response.json({ message: "Student not found" }, { status: 404 })
        }
        const updatedDoc = await myCollection.findOneAndUpdate(
            { enrollmentNumber: String(body.enrollmentNumber) },
            {
                $set: {
                    first_year_marks: body.first_year_marks,
                    second_year_marks: body.second_year_marks,
                    third_year_marks: body.third_year_marks,
                },
            },
            {
                returnDocument: "after", // MongoDB Node.js Driver v4+
                // returnOriginal: false  // Older versions
            }
        );
        return Response.json({ message: "Marks updated", updatedDoc })


    } catch (error) {
        console.log("error", error);

        return Response.json({ message: "ERROR", error }, { status: 500 })

    }

}