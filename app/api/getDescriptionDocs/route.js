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

async function getDescriptionCollectionValues(collectionID) {
  try {
    const docRef = db.collection(collectionID).doc("DESCRIPTIONS");
    const docSnap = await docRef.get();
    if (docSnap.exists) {
      const data = docSnap.data();
      const {
        Difficulty: difficulty,
        Prizes: prizes,
        Skill: skill,
        Task: task,
        Time: time,
      } = data;
      return { difficulty, prizes, skill, task, time };
    }
  } catch (error) {
    console.error("Error getting document:", error);
    throw error;
  }
}

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const collectionID = searchParams.get("collectionID");
  try {
    const data = await getDescriptionCollectionValues(collectionID);
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}
