// Impotarmos las funciones para usar el SDK de firebase
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { collection, addDoc, getDocs } from "firebase/firestore";
import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";
// La configuracion de firebase

dotenv.config();
console.log(process.env);

const firebaseConfig = {
  apiKey: process.env.APIKEY,

  authDomain: process.env.AUTHDOMAIN,

  projectId: process.env.PROJECTID,

  storageBucket: process.env.STORAGEBUCKET,

  messagingSenderId: process.env.MESSAGINGSENDERID,

  appId: process.env.APPID,
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);

// Para Bucket Storage
export const storage = getStorage(app);

export const uploadFile = async (file: File) => {
  const storageRef = ref(storage, uuidv4());
  await uploadBytes(storageRef, file);
};

// Para base de datros

const db = getFirestore(app);

export const uploadInfo = async () => {
  console.log("Entra a funcion");

  try {
    console.log("Entra a try");

    const docRef = await addDoc(collection(db, "fotos"), {
      first: "Ada",
      last: "Lovelace",
      born: 1815,
    });
    console.log("Document written with ID: ", docRef);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const getDocs = async () => {
  //const querySnapshot = await getDocs(collection(db, "fotos"));
  console.log(db);
};
