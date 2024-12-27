import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

export default async function handler(req, res) {
  await client.connect();
  const db = client.db("employee_master");
  const employees = db.collection("employees");

  if (req.method === "GET") {
    const data = await employees.find().toArray();
    res.status(200).json(data);
  } else if (req.method === "POST") {
    const newEmployee = req.body;
    await employees.insertOne(newEmployee);
    res.status(201).json({ message: "Employee added!" });
  } else if (req.method === "PUT") {
    const { id, ...updates } = req.body;
    await employees.updateOne({ _id: new ObjectId(id) }, { $set: updates });
    res.status(200).json({ message: "Employee updated!" });
  } else if (req.method === "DELETE") {
    const { id } = req.body;
    await employees.deleteOne({ _id: new ObjectId(id) });
    res.status(200).json({ message: "Employee deleted!" });
  } else {
    res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
