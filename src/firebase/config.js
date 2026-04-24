import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut,
  updateProfile,
  onAuthStateChanged
} from 'firebase/auth';
import { 
  getFirestore, 
  doc, 
  setDoc, 
  getDoc
} from 'firebase/firestore';

// Unga Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAum1os5WHqmZESByYBKeuXbWXo_b9OdwU",
  authDomain: "king-drop-taxi.firebaseapp.com",
  projectId: "king-drop-taxi",
  storageBucket: "king-drop-taxi.firebasestorage.app",
  messagingSenderId: "600885836150",
  appId: "1:600885836150:web:2faad73d2f1b5fe3df6257",
  measurementId: "G-FE9BGJQZZZ"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Register Function - Itha use pannu
export const registerUser = async (email, password, name, phone) => {
  try {
    console.log("1. Register started for:", email);
    
    // Create user in Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log("2. Auth user created:", userCredential.user.uid);
    
    // Update profile
    await updateProfile(userCredential.user, {
      displayName: name
    });
    console.log("3. Profile updated with name:", name);
    
    // Save to Firestore
    const userData = {
      uid: userCredential.user.uid,
      name: name,
      email: email,
      phone: phone,
      createdAt: new Date().toISOString(),
      role: 'customer'
    };
    
    await setDoc(doc(db, 'users', userCredential.user.uid), userData);
    console.log("4. Firestore la save aachu!", userData);
    
    return { success: true, user: userCredential.user };
  } catch (error) {
    console.error("❌ Register error:", error);
    return { success: false, error: error.message };
  }
};

export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const userDoc = await getDoc(doc(db, 'users', userCredential.user.uid));
    const userData = userDoc.exists() ? userDoc.data() : {};
    
    return { 
      success: true, 
      user: {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        name: userData.name || userCredential.user.displayName,
        phone: userData.phone || ''
      }
    };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const logoutUser = async () => {
  try {
    await signOut(auth);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const onAuthStateChange = (callback) => {
  return onAuthStateChanged(auth, async (firebaseUser) => {
    if (firebaseUser) {
      const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
      const userData = userDoc.exists() ? userDoc.data() : {};
      callback({
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        name: userData.name || firebaseUser.displayName,
        phone: userData.phone || ''
      });
    } else {
      callback(null);
    }
  });
};