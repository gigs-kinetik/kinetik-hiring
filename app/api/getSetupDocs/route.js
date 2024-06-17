import { NextResponse } from "next/server";
import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import serviceAccount from "../../../serviceAccountKey.json";

if (!getApps().length) {
  initializeApp({
    credential: cert(serviceAccount),
  });
}

const db = getFirestore();

async function getCollectionValues(collectionID) {
  try {
    const docRef = db.collection(collectionID).doc("SETUP");
    const docSnap = await docRef.get();
    if (docSnap.exists) {
      const data = docSnap.data();
      const {
        Difficulty: difficulty,
        "Prize Pool": prizePool,
        Skill: skill,
        Task: task,
        Time: time,
      } = data;
      return { difficulty, prizePool, skill, task, time };
    }
  } catch (error) {
    console.error("Error getting document:", error);
    throw error;
  }
}

async function getAllCollections() {
  try {
    const collections = await db.listCollections();
    const info = [];
    for (const collection of collections) {
      const name = collection.id;
      const data = await getCollectionValues(name);
      info.push({ name, data });
    }
    return info;
  } catch (error) {
    console.error("Error getting collections:", error);
    throw error;
  }
}

export async function GET() {
  try {
    const data = await getAllCollections();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}
