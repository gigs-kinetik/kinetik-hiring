import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore, doc, getDoc, collection, getDocs } from 'firebase-admin/firestore';
import serviceAccount from './serviceAccountKey.json';

initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore();

export async function addToEventDB(eventID, userID, projectLink, resumeLink) {
  const docRef = db.collection(eventID).doc(userID);
  const newData = {
    'Project Link': projectLink,
    'Resume Link': resumeLink,
  };

  await docRef.set(newData);
}

export async function getSetupDocumentValues(eventID) {
  const docRef = doc(db, eventID, 'SETUP');
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const data = docSnap.data();
    const { Difficulty: difficulty, 'Prize Pool': prizePool, Skill: skill, Task: task, Time: time } = data;

    return { difficulty, prizePool, skill, task, time };
  } else {
    console.log("No such document!");
    return {};
  }
}

async function listCollections() {
  const collections = await db.listCollections();
  return collections.map(collection => collection.id);
}

export async function getAllEvents() {
  const collectionNames = await listCollections();
  const allSetupEvents = [];

  for (const collectionName of collectionNames) {
    const eventsCollection = collection(db, collectionName);
    const eventsSnapshot = await getDocs(eventsCollection);
    const setupEvents = eventsSnapshot.docs
      .map(doc => ({ id: doc.id, ...doc.data() }))
      .filter(event => event.type === 'SETUP');
    allSetupEvents.push(...setupEvents);
  }

  return allSetupEvents;
}

module.exports = { addToEventDB, getSetupDocumentValues, getAllEvents };
