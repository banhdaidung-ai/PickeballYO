import { collection, addDoc, getDocs, deleteDoc, doc, query, where } from "firebase/firestore";
import { db } from "../firebase";

const COLLECTION_NAME = "schedule";
const scheduleData = [
  {
    startTime: "17:30",
    dayLabel: "Thứ 2 (T2)",
    courtName: "Sân TDS",
    timeRange: "17:30 - 19:30",
    type: "Sân Pickleball",
    isLive: false,
    participants: []
  },
  {
    startTime: "17:30",
    dayLabel: "Thứ 3 (T3)",
    courtName: "Sân Divo",
    timeRange: "17:30 - 19:30",
    type: "Hợp đồng cố định",
    isLive: false,
    participants: []
  },
  {
    startTime: "17:30",
    dayLabel: "Thứ 4 (T4)",
    courtName: "Sân TDS",
    timeRange: "17:30 - 19:30",
    type: "Sân Pickleball",
    isLive: true,
    participants: []
  },
  {
    startTime: "17:30",
    dayLabel: "Thứ 5 (T5)",
    courtName: "Sân Divo",
    timeRange: "17:30 - 19:30",
    type: "Hợp đồng cố định",
    isLive: false,
    participants: []
  },
  {
    startTime: "10:30",
    dayLabel: "Thứ 6 (T6)",
    courtName: "Sân TDS",
    timeRange: "10:30 - 12:30",
    type: "Sân Pickleball",
    isLive: false,
    participants: []
  },
  {
    startTime: "06:00",
    dayLabel: "Thứ 7 (T7)",
    courtName: "Sân Divo",
    timeRange: "06:00 - 08:00",
    type: "Hợp đồng cố định",
    isLive: false,
    participants: []
  },
  {
    startTime: "06:00",
    dayLabel: "Chủ Nhật (CN)",
    courtName: "Sân Divo",
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
        console.log(`Added session for ${item.dayLabel}`);
      } else {
        skippedCount++;
        console.log(`Skipped duplicate for ${item.dayLabel}`);
      }
    }
    
    alert(`Hoàn tất! Đã thêm ${addedCount} buổi mới, bỏ qua ${skippedCount} buổi trùng lặp.`);
  } catch (e) {
    console.error("Error adding document: ", e);
    alert("Lỗi khi thêm dữ liệu: " + e.message);
  }
};

export const resetAndSeed = async () => {
  if (window.confirm("Bạn có chắc chắn muốn XÓA TOÀN BỘ dữ liệu cũ và khởi tạo lại không?")) {
    try {
      await clearDatabase();
      await seedDatabase();
      alert("Đã xóa và khởi tạo lại dữ liệu thành công!");
    } catch (e) {
      alert("Lỗi: " + e.message);
    }
  }
};
