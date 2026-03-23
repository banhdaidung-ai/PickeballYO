import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";

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

export const seedDatabase = async () => {
  try {
    for (const item of scheduleData) {
      await addDoc(collection(db, "schedule"), item);
      console.log(`Added session for ${item.dayLabel}`);
    }
    alert("Đã thêm dữ liệu thành công!");
  } catch (e) {
    console.error("Error adding document: ", e);
    alert("Lỗi khi thêm dữ liệu: " + e.message);
  }
};
