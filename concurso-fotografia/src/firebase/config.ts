// Impotarmos las funciones para usar el SDK de firebase
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { initializeApp } from "firebase/app";
import { v4 as uuidv4 } from "uuid";

import { getFirestore, addDoc, collection, getDocs } from "firebase/firestore";
// La configuracion de firebase

const firebaseConfig = {};

// Initialize Firebase

const app = initializeApp(firebaseConfig);

// Para Bucket Storage
export const storage = getStorage(app);

export const uploadFile = async (file: File) => {
  const storageRef = ref(storage, uuidv4());
  await uploadBytes(storageRef, file);
  const url = await getDownloadURL(storageRef);
  return url;
};

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app, "concurso");

export const uploadInfo = async (data: Object) => {
  try {
    const docRef = await addDoc(collection(db, "fotos"), data);
    return docRef;
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const getData = async () => {
  const querySnapshot = await getDocs(collection(db, "fotos"));
  let allData: Array<Object> = [];
  querySnapshot.forEach((doc) => {
    allData.push({ ...doc.data(), id: doc.id });
  });
  return allData;
};
