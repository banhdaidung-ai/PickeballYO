import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc, query, orderBy, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";

const CONTRIBUTIONS_COL = "fund_contributions";
const TRANSACTIONS_COL = "fund_transactions";

/** Fetch all member contributions */
export const getContributions = async () => {
  const snap = await getDocs(collection(db, CONTRIBUTIONS_COL));
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
};

/** Toggle paid status for a contribution */
export const togglePaid = async (id, current) => {
  await updateDoc(doc(db, CONTRIBUTIONS_COL, id), {
    paid: !current,
    paidAt: !current ? new Date().toISOString() : null
  });
};

/** Fetch all transactions ordered by date desc */
export const getTransactions = async () => {
  try {
    const snap = await getDocs(query(collection(db, TRANSACTIONS_COL), orderBy("createdAt", "desc")));
    return snap.docs.map(d => ({ id: d.id, ...d.data() }));
  } catch {
    // If index not ready, fallback without orderBy
    const snap = await getDocs(collection(db, TRANSACTIONS_COL));
    return snap.docs.map(d => ({ id: d.id, ...d.data() }))
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }
};

/** Add a new transaction */
export const addTransaction = async (data) => {
  await addDoc(collection(db, TRANSACTIONS_COL), {
    ...data,
    createdAt: new Date().toISOString()
  });
};

/** Add a new contribution record */
export const addContribution = async (data) => {
  await addDoc(collection(db, CONTRIBUTIONS_COL), {
    ...data,
    paid: false,
    createdAt: new Date().toISOString()
  });
};

/** Seed initial contributions from existing users */
export const seedContributionsFromUsers = async (users) => {
  const existing = await getContributions();
  const existingUids = new Set(existing.map(c => c.userId));
  for (const u of users) {
    if (!existingUids.has(u.uid)) {
      await addContribution({
        userId: u.uid,
        fullName: u.fullName || 'Ẩn danh',
        phone: u.phone || '',
        photoURL: u.photoURL || '',
        amount: 500000,
      });
    }
  }
};

/** Update a contribution record */
export const updateContribution = async (id, data) => {
  await updateDoc(doc(db, CONTRIBUTIONS_COL, id), data);
};

/** Delete a contribution record */
export const deleteContribution = async (id) => {
  await deleteDoc(doc(db, CONTRIBUTIONS_COL, id));
};

/** Fetch a single transaction by ID */
export const getTransaction = async (id) => {
  const snap = await getDocs(query(collection(db, TRANSACTIONS_COL))); // fallback if doc() doesn't work directly with id
  // more efficient:
  const d = await getDocs(query(collection(db, TRANSACTIONS_COL)));
  return d.docs.find(doc => doc.id === id)?.data();
};

/** Update an existing transaction */
export const updateTransaction = async (id, data) => {
  await updateDoc(doc(db, TRANSACTIONS_COL, id), data);
};

/** Delete a transaction */
export const deleteTransaction = async (id) => {
  await deleteDoc(doc(db, TRANSACTIONS_COL, id));
};
