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
    throw new Error("Không tìm thấy thông tin người dùng (Missing User ID)");
  }
  try {
    console.log(`[cancelBooking] Attempting to remove user ${userId} from session ${sessionId}`);
    const sessionRef = doc(db, SCHEDULE_COLLECTION, sessionId);
    const sessionDoc = await getDoc(sessionRef);
    
    if (sessionDoc.exists()) {
      const data = sessionDoc.data();
      const participants = data.participants || [];
      const originalCount = participants.length;
      
      const updatedParticipants = participants.filter(p => p.userId !== userId);
      
      if (updatedParticipants.length === originalCount) {
        console.warn(`[cancelBooking] User ${userId} was not found in the participants list.`);
        // Even if not found, we should ensure the state is consistent
      } else {
        console.log(`[cancelBooking] Found and removed ${originalCount - updatedParticipants.length} entries for user ${userId}`);
      }
      
      await updateDoc(sessionRef, {
        participants: updatedParticipants
      });
      console.log("[cancelBooking] Successfully updated Firestore document.");
    } else {
      throw new Error("Buổi tập không tồn tại.");
    }
  } catch (error) {
    console.error("[cancelBooking] Error:", error);
    throw error;
  }
};
