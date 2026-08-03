// lib/mongodb.js
import { MongoClient } from "mongodb";

const uri    = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB || "floodguard";

if (!uri) throw new Error("MONGODB_URI is not defined in .env.local");

let client;
let clientPromise;

if (process.env.NODE_ENV === "development") {
  // In dev, reuse connection across hot reloads
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

export async function getDb() {
  const c = await clientPromise;
  return c.db(dbName);
}

export default clientPromise;