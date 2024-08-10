// firebaseService.js
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { initializeApp } from "firebase/app";

// Tu configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDFVdE7PGDoUSNDUBNPCSssgGRC1TJOVyA",
  authDomain: "project007-78c04.firebaseapp.com",
  databaseURL: "https://project007-78c04-default-rtdb.firebaseio.com",
  projectId: "project007-78c04",
  storageBucket: "project007-78c04.appspot.com",
  messagingSenderId: "605375160655",
  appId: "1:605375160655:web:4443e68731590e40a2a53a",
  measurementId: "G-QMR7LR9MJG",
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

// Función para subir imagen y almacenar el producto
export const uploadImageAndStoreProduct = async (product, imageFile) => {
  if (!imageFile) throw new Error("No image file provided");
  const storageRef = ref(storage, `images/${imageFile.name}`);
  await uploadBytes(storageRef, imageFile);

  const imageURL = await getDownloadURL(storageRef);

  const productRef = collection(db, "products");
  await addDoc(productRef, { ...product, imageURL });
};

// Función para obtener productos
export const fetchProducts = async () => {
  const productCollection = collection(db, "products");
  const productSnapshot = await getDocs(productCollection);
  const products = productSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return products;
};

// Función para agregar un servicio
export const addService = async (service) => {
  const serviceRef = collection(db, "services");
  await addDoc(serviceRef, service);
};

// Función para obtener servicios
export const fetchServices = async () => {
  const serviceCollection = collection(db, "services");
  const serviceSnapshot = await getDocs(serviceCollection);
  const services = serviceSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return services;
};
