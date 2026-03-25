import { doc, updateDoc, arrayUnion, arrayRemove, collection, query, getDocs, getDoc } from "firebase/firestore";
import { db } from "../firebase";

const SCHEDULE_COLLECTION = "schedule";

export const getUserBookings = async (uid) => {
  try {
    const q = query(collection(db, SCHEDULE_COLLECTION));
    const querySnapshot = await getDocs(q);
    const bookings = [];
    querySnapshot.forEach((doc) => {
      const session = { id: doc.id, ...doc.data() };
      if (session.participants && session.participants.some(p => p.userId === uid)) {
        bookings.push(session);
      }
    });
    return bookings;
  } catch (error) {
    console.error("Error getting user bookings: ", error);
    throw error;
  }
};

export const getAllBookings = async () => {
  try {
    const q = query(collection(db, SCHEDULE_COLLECTION));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error getting all bookings: ", error);
    throw error;
  }
};

export const bookSession = async (sessionId, userId, userName) => {
  try {
    const sessionRef = doc(db, SCHEDULE_COLLECTION, sessionId);
    await updateDoc(sessionRef, {
      participants: arrayUnion({
        userId,
        userName,
        bookedAt: new Date().toISOString()
      })
    });
  } catch (error) {
    console.error("Error booking session:", error);
    throw error;
  }
};

export const cancelBooking = async (sessionId, userId) => {
  if (!userId) {
    throw new Error("Không tìm thấy mã người dùng (UID). Vui lòng thử đăng nhập lại.");
  }
  
  try {
    console.log(`[cancelBooking] Khởi động hủy cho User: ${userId}, Session: ${sessionId}`);
    const sessionRef = doc(db, SCHEDULE_COLLECTION, sessionId);
    const sessionDoc = await getDoc(sessionRef);
    
    if (!sessionDoc.exists()) {
      throw new Error("Dữ liệu buổi tập không tồn tại trên hệ thống.");
    }

    const data = sessionDoc.data();
    const participants = data.participants || [];
    
    // Tìm chính xác đối tượng cần xóa để dùng arrayRemove (an toàn hơn)
    const participantToRemove = participants.find(p => String(p.userId) === String(userId));
    
    if (!participantToRemove) {
      console.warn(`[cancelBooking] Không tìm thấy User ${userId} trong danh sách:`, participants);
      // Nếu không tìm thấy bằng ID, thử tìm "fuzzy" hoặc thông báo lỗi cụ thể
      throw new Error("Không tìm thấy bạn trong danh sách tham gia của buổi tập này.");
    }

    console.log("[cancelBooking] Đã tìm thấy đối tượng tham gia, tiến hành xóa...");
    
    await updateDoc(sessionRef, {
      participants: arrayRemove(participantToRemove)
    });
    
    console.log("[cancelBooking] Hoàn tất xóa phần tử khỏi Firestore.");
  } catch (error) {
    console.error("[cancelBooking] Lỗi hệ thống:", error);
    throw error;
  }
};
