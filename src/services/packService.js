import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

import { db } from "../firebase";

const packsRef = collection(db, "Packs");

export async function getPacks(categoryId) {
  const q = query(
    packsRef,
    where("categoryId", "==", categoryId),
    where("isActive", "==", true),
    orderBy("order")
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}

export async function addPack(pack) {
  return await addDoc(packsRef, pack);
}

export async function deletePack(id) {
  return await deleteDoc(doc(db, "Packs", id));
}