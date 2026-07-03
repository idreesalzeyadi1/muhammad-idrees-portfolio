import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyCP1UpK0E3ltId4VtAVRCGi26UMW81EhT8",
  authDomain: "portfolio-44b24.firebaseapp.com",
  projectId: "portfolio-44b24",
  storageBucket: "portfolio-44b24.firebasestorage.app",
  messagingSenderId: "837554706060",
  appId: "1:837554706060:web:37c942567b8ae0273a8da9"
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const auth = getAuth(app)