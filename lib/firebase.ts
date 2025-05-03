import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, User } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCqjE6rzRSrrh7gjPt6DgRpaokGkE1M8k8",
  authDomain: "clicktofitness-76be2.firebaseapp.com",
  projectId: "clicktofitness-76be2",
  storageBucket: "clicktofitness-76be2.firebasestorage.app",
  messagingSenderId: "711700406137",
  appId: "1:711700406137:web:04c34a3db1d1e60e7359a8",
  measurementId: "G-Y9TGB8MSYY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

// Initialize Auth
export const auth = getAuth(app);

// Admin email list - replace with your email
const ADMIN_EMAILS = ['alexanderbonnici214@gmail.com']; // Add your email here

export const isAdminUser = (user: User | null): boolean => {
  return user !== null && ADMIN_EMAILS.includes(user.email || '');
};

// Function to sign in admin
export const signInAdmin = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    if (!isAdminUser(userCredential.user)) {
      throw new Error('User is not authorized as admin');
    }
    return userCredential.user;
  } catch (error) {
    throw error;
  }
};

// Function to check if user is authenticated and is admin
export const checkAdminAuth = (): Promise<boolean> => {
  return new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe(); // Unsubscribe immediately after first check
      resolve(isAdminUser(user));
    });
  });
};
