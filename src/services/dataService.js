import { collection, query, getDocs, addDoc, updateDoc, doc, onSnapshot, orderBy } from "firebase/firestore";
import { db } from "../firebase";

const COLLECTION_NAME = "schedule";

export const getSchedule = async () => {
  const q = query(collection(db, COLLECTION_NAME), orderBy("dayIndex", "asc"));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const subscribeToSchedule = (callback) => {
  const q = query(collection(db, COLLECTION_NAME), orderBy("dayIndex", "asc"));
  return onSnapshot(q, (querySnapshot) => {
    const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    callback(data);
  });
};

export const joinSession = async (sessionId, userId) => {
  const sessionDoc = doc(db, COLLECTION_NAME, sessionId);
  // Add userId to participants array if not already present
  // Note: This is a simple implementation. In a real app, you'd use arrayUnion and proper auth.
  return updateDoc(sessionDoc, {
    participants: [userId] // Placeholder for more complex array update
  });
};
