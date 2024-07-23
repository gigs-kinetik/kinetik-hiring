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

async function getEventDocs() {
  try {
    const eventsCollection = db.collection("Events");
    const snapshot = await eventsCollection.get();
    const events = [];
    snapshot.forEach((doc) => {
      events.push({ "Event ID": doc.id, ...doc.data() });
    });
    return events;
  } catch (error) {
    console.error("Error getting documents:", error);
    throw error;
  }
}

export async function GET() {
  try {
    const events = await getEventDocs();
    const response = NextResponse.json(events, { status: 200 });
    return response;
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}

export const revalidate = 0;
