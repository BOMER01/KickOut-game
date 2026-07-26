import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

import { db } from "../firebase";

const categoriesRef = collection(db, "categories");

// جلب جميع التصنيفات
export async function getCategories() {
  const snapshot = await getDocs(categoriesRef);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}

// إضافة تصنيف جديد
export async function addCategory(category) {
  return await addDoc(categoriesRef, category);
}

// حذف تصنيف
export async function deleteCategory(id) {
  return await deleteDoc(doc(db, "categories", id));
}

// تعديل تصنيف
export async function updateCategory(id, data) {
  return await updateDoc(doc(db, "categories", id), data);
}