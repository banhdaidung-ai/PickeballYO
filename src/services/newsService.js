import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  getDocs, 
  getDoc, 
  query, 
  orderBy, 
  where,
  onSnapshot,
  serverTimestamp 
} from 'firebase/firestore';
import { db } from '../firebase';

const newsCollection = collection(db, 'news');

/**
 * Get all news articles (sorted by date)
 */
export const getAllNews = async (includeDrafts = false) => {
  let q;
  if (includeDrafts) {
    q = query(newsCollection);
  } else {
    q = query(newsCollection, where('status', '==', 'published'));
  }
  
  const snapshot = await getDocs(q);
  const news = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  
  // Client-side sorting as a fallback for missing indices
  return news.sort((a, b) => {
    const dateA = a.createdAt?.toDate ? a.createdAt.toDate() : new Date(a.createdAt || 0);
    const dateB = b.createdAt?.toDate ? b.createdAt.toDate() : new Date(b.createdAt || 0);
    return dateB - dateA;
  });
};

/**
 * Get a single news article by ID
 */
export const getNewsById = async (id) => {
  const docRef = doc(db, 'news', id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() };
  }
  return null;
};

/**
 * Add a new article
 */
export const addNews = async (newsData) => {
  return await addDoc(newsCollection, {
    ...newsData,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  });
};

/**
 * Update an article
 */
export const updateNews = async (id, newsData) => {
  const docRef = doc(db, 'news', id);
  return await updateDoc(docRef, {
    ...newsData,
    updatedAt: serverTimestamp()
  });
};

/**
 * Delete an article
 */
export const deleteNews = async (id) => {
  const docRef = doc(db, 'news', id);
  return await deleteDoc(docRef);
};

/**
 * Subscribe to news updates
 */
export const subscribeToNews = (callback, includeDrafts = false) => {
  let q;
  if (includeDrafts) {
    q = query(newsCollection);
  } else {
    q = query(newsCollection, where('status', '==', 'published'));
  }

  return onSnapshot(q, (snapshot) => {
    const news = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    
    // Client-side sorting as a fallback for missing indices
    const sortedNews = news.sort((a, b) => {
      const dateA = a.createdAt?.toDate ? a.createdAt.toDate() : new Date(a.createdAt || 0);
      const dateB = b.createdAt?.toDate ? b.createdAt.toDate() : new Date(b.createdAt || 0);
      return dateB - dateA;
    });
    
    callback(sortedNews);
  });
};
