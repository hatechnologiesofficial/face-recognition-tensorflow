import { MongoClient } from "mongodb";

export async function GET(request: Request,
    { params }: { params: Promise<{ enrollmentNumber: string }> }
) {
    const { enrollmentNumber } = await params
    const client = new MongoClient(process.env.MONGODB_URI as string);

    try{
        await client.connect();
        const db = client.db("ists")
        const myCollection = db.collection("students")
        const result = await myCollection.findOne({ enrollmentNumber: String(enrollmentNumber) })
        if(result){
            return Response.json(result , { status: 200 });
        }else{
            return Response.json({message:"Student not found"}, {status:404})
        }

    }catch{
        return Response.json(
            { message: "not connected" },
            { status: 500, });
    }
}