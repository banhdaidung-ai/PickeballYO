import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
  updatePassword
} from "firebase/auth";
import { doc, setDoc, getDoc, collection, getDocs, updateDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

const USERS_COLLECTION = "users";

export const updateUserProfile = async (uid, data) => {
  try {
    const userRef = doc(db, USERS_COLLECTION, uid);
    await updateDoc(userRef, data);
  } catch (error) {
    console.error("Error updating user profile:", error);
    throw error;
  }
};


export const updateUserPassword = async (newPassword) => {
  try {
    const user = auth.currentUser;
    if (user) {
      await updatePassword(user, newPassword);
    } else {
      throw new Error("No user is logged in.");
    }
  } catch (error) {
    console.error("Error updating password:", error);
    throw error;
  }
};

const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    const userDoc = await getDoc(doc(db, USERS_COLLECTION, user.uid));
    if (!userDoc.exists()) {
      await setDoc(doc(db, USERS_COLLECTION, user.uid), {
        uid: user.uid,
        email: user.email,
        fullName: user.displayName || '',
        photoURL: user.photoURL || '',
        createdAt: new Date().toISOString()
      });
    }
    return user;
  } catch (error) {
    console.error("Error signing in with Google:", error);
    throw error;
  }
};

export const signInWithFacebook = async () => {
  try {
    const result = await signInWithPopup(auth, facebookProvider);
    const user = result.user;
    const userDoc = await getDoc(doc(db, USERS_COLLECTION, user.uid));
    if (!userDoc.exists()) {
      await setDoc(doc(db, USERS_COLLECTION, user.uid), {
        uid: user.uid,
        email: user.email,
        fullName: user.displayName || '',
        photoURL: user.photoURL || '',
        createdAt: new Date().toISOString()
      });
    }
    return user;
  } catch (error) {
    console.error("Error signing in with Facebook:", error);
    throw error;
  }
};

export const signUp = async (email, password, userData) => {
  try {
    console.log("Starting signUp process for:", email);
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log("Firebase Auth user created:", user.uid);
    
    // Save additional user data to Firestore
    try {
      await setDoc(doc(db, USERS_COLLECTION, user.uid), {
        uid: user.uid,
        email: user.email,
        ...userData,
        createdAt: new Date().toISOString()
      });
      console.log("Firestore user document created for:", user.uid);
    } catch (fsError) {
      console.error("Error creating Firestore user document:", fsError);
      // Even if Firestore fails, the Auth user is created. 
      // We throw a specific error to let the UI know.
      throw new Error(`Auth success, but Firestore failed: ${fsError.message}`);
    }
    
    return user;
  } catch (error) {
    console.error("Error in signUp service:", error.code, error.message);
    throw error;
  }
};

export const signIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error("Error signing in:", error);
    throw error;
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Error signing out:", error);
    throw error;
  }
};

export const getUserData = async (uid) => {
  try {
    const userDoc = await getDoc(doc(db, USERS_COLLECTION, uid));
    if (userDoc.exists()) {
      return userDoc.data();
    }
    return null;
  } catch (error) {
    console.error("Error getting user data:", error);
    throw error;
  }
};

export const onAuthChange = (callback) => {
  return onAuthStateChanged(auth, callback);
};

export const getAllUsers = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, USERS_COLLECTION));
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error getting all users:", error);
    throw error;
  }
};
