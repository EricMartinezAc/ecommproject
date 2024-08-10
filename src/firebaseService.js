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

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

// CRUD Productos
export const fetchProducts = async () => {
  const productsCollection = collection(db, "products");
  const productsSnapshot = await getDocs(productsCollection);
  return productsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const addProduct = async (product, imageFile) => {
  let imageURL = "";

  if (imageFile) {
    const imageRef = ref(storage, `images/${imageFile.name}`);
    await uploadBytes(imageRef, imageFile);
    imageURL = await getDownloadURL(imageRef);
  }

  const productsCollection = collection(db, "products");
  await addDoc(productsCollection, { ...product, imageURL });
};

export const updateProduct = async (id, updatedProduct) => {
  const productRef = doc(db, "products", id);
  await updateDoc(productRef, updatedProduct);
};

export const deleteProduct = async (id) => {
  const productRef = doc(db, "products", id);
  await deleteDoc(productRef);
};

// CRUD Servicios
export const fetchServices = async () => {
  const servicesCollection = collection(db, "services");
  const servicesSnapshot = await getDocs(servicesCollection);
  return servicesSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const addService = async (service) => {
  const servicesCollection = collection(db, "services");
  await addDoc(servicesCollection, service);
};

export const updateService = async (id, updatedService) => {
  const serviceRef = doc(db, "services", id);
  await updateDoc(serviceRef, updatedService);
};

export const deleteService = async (id) => {
  const serviceRef = doc(db, "services", id);
  await deleteDoc(serviceRef);
};
