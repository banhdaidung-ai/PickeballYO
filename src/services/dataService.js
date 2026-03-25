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

export const getSessionById = async (id) => {
  try {
    const sessionDoc = await getDocs(query(collection(db, COLLECTION_NAME)));
    // In a real app, use doc(db, COLLECTION_NAME, id), but ids might be custom or generated
    const docRef = doc(db, COLLECTION_NAME, id);
    const docSnap = await getDocs(query(collection(db, COLLECTION_NAME)));
    // Simpler way:
    const q = query(collection(db, COLLECTION_NAME));
    const querySnapshot = await getDocs(q);
    const session = querySnapshot.docs.find(d => d.id === id);
    if (session) {
      return { id: session.id, ...session.data() };
    }
    return null;
  } catch (error) {
    console.error("Error getting session:", error);
    throw error;
  }
};

export const subscribeToSession = (id, callback) => {
  const docRef = doc(db, COLLECTION_NAME, id);
  return onSnapshot(docRef, (doc) => {
    if (doc.exists()) {
      callback({ id: doc.id, ...doc.data() });
    }
  });
};
