import { MongoClient } from "mongodb";
import { cookies } from 'next/headers'
export async function POST(request: Request) {
const cookieStore = await cookies()
    const body = await request.json()
    if (!body.email) {
        return Response.json({ message: "Email is required" }, { status: 400 })
    }
    if (!body.password) {
        return Response.json({ message: "Password is required" }, { status: 400 })
    }

    const client = new MongoClient(process.env.MONGODB_URI as string);
    try {
        await client.connect();
        const db = client.db("ists")
        const myCollection = db.collection("colleges")

        const result = await myCollection.findOne({
            email: body.email,
            password: body.password
        })
        if (result) {
            cookieStore.set("user", result._id.toString(), { path: "/" })
            return Response.json(result);
        } else {
            return Response.json({ message: "Data not found" }, { status: 404 });

        }

    } catch {
        return Response.json(
            { message: "not connected" },
            { status: 500, });
    }

}
