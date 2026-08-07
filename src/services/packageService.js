import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

import { db } from "../firebase";

const packagesRef = collection(db, "packages");

export async function getPackages() {
  const q = query(
    packagesRef,
    where("isActive", "==", true),
    orderBy("order")
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}

export async function addPackage(packageData) {
  return await addDoc(packagesRef, packageData);
}

export async function deletePackage(id) {
  return await deleteDoc(doc(db, "packages", id));
}

export async function updatePackage(id, data) {
  return await updateDoc(
    doc(db, "packages", id),
    data
  );
}