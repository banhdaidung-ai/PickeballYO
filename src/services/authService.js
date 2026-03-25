import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  updatePassword
} from "firebase/auth";
import { doc, setDoc, getDoc, collection, getDocs, updateDoc, deleteDoc } from "firebase/firestore";
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

export { auth }; // Export auth for getRedirectResult in context

/**
 * Ensures a user document exists in Firestore and stays in sync with auth data.
 */
export const ensureUserDocument = async (user) => {
  if (!user) return null;
  
  try {
    const userRef = doc(db, USERS_COLLECTION, user.uid);
    const userDoc = await getDoc(userRef);
    
    if (!userDoc.exists()) {
      const isAdmin = user.email === 'banhdaidung@gmail.com';
      const userData = {
        uid: user.uid,
        email: user.email,
        fullName: user.displayName || '',
        photoURL: user.photoURL || '',
        role: isAdmin ? 'admin' : 'member',
        createdAt: new Date().toISOString()
      };
      await setDoc(userRef, userData);
      return userData;
    }
    // Ensure admin email always has admin role
    const existingData = userDoc.data();
    if (user.email === 'banhdaidung@gmail.com' && existingData.role !== 'admin') {
      await updateDoc(userRef, { role: 'admin' });
      return { ...existingData, role: 'admin' };
    }
    return existingData;
  } catch (error) {
    console.error("Error ensuring user document:", error);
    throw error;
  }
};

const isMobile = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

export const isInAppBrowser = () => {
  const ua = navigator.userAgent || navigator.vendor || window.opera;
  return (ua.indexOf("FBAN") > -1) || (ua.indexOf("FBAV") > -1) || (ua.indexOf("Zalo") > -1) || (ua.indexOf("Instagram") > -1);
};

export const signInWithGoogle = async () => {
  try {
    // Revert to PopUp as primary, but Login UI will handle blocked cases
    const result = await signInWithPopup(auth, googleProvider);
    await ensureUserDocument(result.user);
    return result.user;
  } catch (error) {
    console.error("Error signing in with Google:", error);
    throw error;
  }
};

export const signInWithGoogleRedirect = async () => {
  try {
    await signInWithRedirect(auth, googleProvider);
  } catch (error) {
    console.error("Error signing in with Google Redirect:", error);
    throw error;
  }
};

export const signInWithFacebook = async () => {
  try {
    const result = await signInWithPopup(auth, facebookProvider);
    await ensureUserDocument(result.user);
    return result.user;
  } catch (error) {
    console.error("Error signing in with Facebook:", error);
    throw error;
  }
};

export const signInWithFacebookRedirect = async () => {
  try {
    await signInWithRedirect(auth, facebookProvider);
  } catch (error) {
    console.error("Error signing in with Facebook Redirect:", error);
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

export const updateUserRole = async (uid, role) => {
  try {
    const userRef = doc(db, USERS_COLLECTION, uid);
    await updateDoc(userRef, { role });
  } catch (error) {
    console.error("Error updating user role:", error);
    throw error;
  }
};

export const deleteUserDoc = async (uid) => {
  try {
    const userRef = doc(db, USERS_COLLECTION, uid);
    await deleteDoc(userRef);
  } catch (error) {
    console.error("Error deleting user document:", error);
    throw error;
  }
};
