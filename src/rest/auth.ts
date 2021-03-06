import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBrQMrRaVkEU2a81KpF0ZiKGVBOW1w701U",
  authDomain: "mortunaadventures.firebaseapp.com",
  projectId: "mortunaadventures",
  storageBucket: "mortunaadventures.appspot.com",
  messagingSenderId: "381740391375",
  appId: "1:381740391375:web:93e08731b29f2fc32e50ba",
  measurementId: "G-K3XXB3ZREH",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export const db = getFirestore(app);

interface loginProps {
  username: string;
  password: string;
}

export async function Auth(props: loginProps) {
  const result = await signInWithEmailAndPassword(
    auth,
    props.username,
    props.password
  )
    .then(() => {
      return true;
    })
    .catch(() => {
      return false;
    });
  return result;
}
