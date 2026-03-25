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
    console.error("No userId provided to cancelBooking");
    return;
  }
  try {
    console.log(`Cancelling booking for user ${userId} in session ${sessionId}`);
    const sessionRef = doc(db, SCHEDULE_COLLECTION, sessionId);
    const sessionDoc = await getDoc(sessionRef);
    
    if (sessionDoc.exists()) {
      const data = sessionDoc.data();
      const participants = data.participants || [];
      const updatedParticipants = participants.filter(p => p.userId !== userId);
      
      await updateDoc(sessionRef, {
        participants: updatedParticipants
      });
      console.log("Successfully removed participant via filter.");
    } else {
      throw new Error("Session does not exist.");
    }
  } catch (error) {
    console.error("Error cancelling booking:", error);
    throw error;
  }
};
