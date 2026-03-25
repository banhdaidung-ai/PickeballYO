import { collection, addDoc, getDocs, deleteDoc, doc, query, where } from "firebase/firestore";
import { db } from "../firebase";

const COLLECTION_NAME = "schedule";
const scheduleData = [
  {
    dayIndex: 1, // Thứ 2 - JS getDay() = 1
    startTime: "17:30",
    dayLabel: "Thứ 2 (T2)",
    courtName: "SÂN TDS",
    locationUrl: "https://maps.app.goo.gl/WSk6dBzFfs4EkYf29",
    timeRange: "17:30 - 19:30",
    type: "Sân Pickleball",
    isLive: false,
    participants: []
  },
  {
    dayIndex: 2, // Thứ 3 - JS getDay() = 2
    startTime: "17:30",
    dayLabel: "Thứ 3 (T3)",
    courtName: "SÂN DIVO",
    timeRange: "17:30 - 19:30",
    type: "Hợp đồng cố định",
    isLive: false,
    participants: []
  },
  {
    dayIndex: 3, // Thứ 4 - JS getDay() = 3
    startTime: "17:30",
    dayLabel: "Thứ 4 (T4)",
    courtName: "SÂN TDS",
    locationUrl: "https://maps.app.goo.gl/WSk6dBzFfs4EkYf29",
    timeRange: "17:30 - 19:30",
    type: "Sân Pickleball",
    isLive: false,
    participants: []
  },
  {
    dayIndex: 4, // Thứ 5 - JS getDay() = 4
    startTime: "17:30",
    dayLabel: "Thứ 5 (T5)",
    courtName: "SÂN DIVO",
    timeRange: "17:30 - 19:30",
    type: "Hợp đồng cố định",
    isLive: false,
    participants: []
  },
  {
    dayIndex: 6, // Thứ 7 - JS getDay() = 6
    startTime: "06:00",
    dayLabel: "Thứ 7 (T7)",
    courtName: "SÂN DIVO",
    timeRange: "06:00 - 08:00",
    type: "Hợp đồng cố định",
    isLive: false,
    participants: []
  },
  {
    dayIndex: 0, // Chủ Nhật - JS getDay() = 0
    startTime: "06:00",
    dayLabel: "Chủ Nhật (CN)",
    courtName: "SÂN DIVO",
    timeRange: "06:00 - 08:00",
    type: "Hợp đồng cố định",
    isLive: false,
    participants: []
  }
];


// Helper to check if a session already exists
const sessionExists = async (dayLabel, startTime) => {
  const q = query(collection(db, COLLECTION_NAME), where("dayLabel", "==", dayLabel), where("startTime", "==", startTime));
  const querySnapshot = await getDocs(q);
  return !querySnapshot.empty;
};

export const clearDatabase = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, COLLECTION_NAME));
    const deletePromises = querySnapshot.docs.map(session => deleteDoc(doc(db, COLLECTION_NAME, session.id)));
    await Promise.all(deletePromises);
    console.log("Database cleared");
  } catch (e) {
    console.error("Error clearing database: ", e);
    throw e;
  }
};

export const seedDatabase = async () => {
  try {
    let addedCount = 0;
    let skippedCount = 0;

    for (const item of scheduleData) {
      const exists = await sessionExists(item.dayLabel, item.startTime);
      if (!exists) {
        await addDoc(collection(db, COLLECTION_NAME), item);
        addedCount++;
      } else {
        skippedCount++;
      }
    }
    return { addedCount, skippedCount };
  } catch (e) {
    console.error("Error adding document: ", e);
    throw e;
  }
};

export const resetAndSeed = async () => {
  try {
    await clearDatabase();
    return await seedDatabase();
  } catch (e) {
    console.error("Error resetting and seeding: ", e);
    throw e;
  }
};
