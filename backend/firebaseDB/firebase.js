const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

const serviceAccount = require('./serviceAccountKey.json');

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();

async function getCollectionNames() {
  try {
    const collections = await db.listCollections();
    const collectionNames = collections.map(collection => collection.id);
    return collectionNames;
  } catch (error) {
    console.error('Error listing collections:', error);
    throw error; // Rethrow the error to be handled by the caller if necessary
  }
}

async function getSetupDocumentValues(collectionID) {
  try {
    const docRef = db.collection(collectionID).doc('SETUP');
    const docSnap = await docRef.get();

    if (docSnap.exists) {
      const data = docSnap.data();
      const { Difficulty: difficulty, 'Prize Pool': prizePool, Skill: skill, Task: task, Time: time } = data;

      return { difficulty, prizePool, skill, task, time };
    } else {
      console.log("No such document!");
      return {};
    }
  } catch (error) {
    console.error('Error getting document:', error);
    throw error;
  }
}

const displayCollectionSetupValues = async () => {
  try {
    const collectionNames = await getCollectionNames();
    let htmlOutput = '<ul>';

    for (const collectionID of collectionNames) {
      const setupValues = await getSetupDocumentValues(collectionID);

      htmlOutput += `
<div className="w-full mt-4 space-y-4">
          <div className="bg-white h-fit rounded-lg p-5">
            <div className="flex flex-col">
              <div className="flex flex-row justify-between">
                <div className="flex flex-col">
                  <div className="lg:flex flex-row hidden space-x-2 mb-2">
                    <div className="rounded-full bg-logo-purple/65 pl-2 pr-2 font-poppins text-sm font-medium text-white">
                      ${setupValues.prizePool}
                    </div>
                  </div>
                  <div className="font-poppins lg:text-xl text-lg font-semibold text-logo-purple">
                    ${collectionID}
                  </div>
                  <div className="font-poppins lg:flex lg:text-xs hidden text-gray-500">
                    Posted at ${setupValues.time}
                  </div>
                </div>
                <Link href="/apply">
                  <button className="rounded-lg bg-logo-purple/85 text-white font-poppins w-32 h-10 font-medium">
                    Apply
                  </button>
                </Link>
              </div>
              <div className="font-poppins sm:text-sm text-xs mt-4 mb-4 text-logo-purple">
                ${setupValues.task}
              </div>
              <div className="lg:flex hidden flex-row justify-between">
                <div className="flex flex-row mt-1 items-center">
                  <StarIcon className="size-5 fill-logo-purple/85" />
                  <StarIcon className="size-5 fill-logo-purple/85" />
                  <StarIcon className="size-5 fill-logo-purple/85" />
                  <StarIcon className="size-5 fill-gray-400" />
                  <StarIcon className="size-5 fill-gray-400" />
                  <div className="font-poppins text-xs pr-2 text-gray-500">
                    &nbsp; Difficulty&nbsp; ${setupValues.difficulty}
                  </div>
                </div>
                <div className="font-poppins text-sm pr-2 text-gray-500">
                  ${setupValues.skill}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>`;
    }

    htmlOutput += '</ul>';
    return htmlOutput;
  } catch (error) {
    console.error('Error displaying collection setup values:', error);
    throw error;
  }
}

module.exports = { displayCollectionSetupValues };  // Export the function
